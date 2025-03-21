import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application, Job, ResumeScore, ResumeScoreCriteria, ScoringCriteria } from "@repo/types";
import { Job as BullJob } from "bullmq";
import { Model } from "mongoose";
import { ApplicationService } from "src/application/application.service";
import { LangchainService } from "src/langchain/langchain.service";
import { calcResumeScore } from "src/utils/calcResumeScore";

import { AppQueueEnum, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_SCORE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeScoreProcessor extends WorkerHost {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(ScoringCriteria.name) private scoringCriteria: Model<ScoringCriteria>,
    @InjectModel(ResumeScore.name) private resumeScore: Model<ResumeScore>,
    private applicationService: ApplicationService,
    private langchainService: LangchainService
  ) {
    super();
  }

  async process(job: BullJob<QueuePayload["resume-score"]>) {
    const application = await this.applicationModel.findById(job.data.applicationId);
    if (!application) {
      throw new Error("Application not found"); // TODO: custom error and logger
    }
    const appJob = await this.jobModel.findById(application.job).populate("scoring_criteria");
    if (!appJob) {
      throw new Error("Job not found"); // TODO: custom error
    }

    if (!appJob.scoring_criteria) {
      throw new Error("Scoring Criteria not found"); // TODO: custom error
    }
    const score = await this.langchainService.scoreResume(
      application.resume_text,
      appJob.description,
      appJob.scoring_criteria
    );

    const savedScore = await this.resumeScore.create({
      criterias: score.evaluation.map((c, idx) => {
        const crit: ResumeScoreCriteria = {
          criteria_name: c.criterionName,
          justification: c.justification,
          order: idx,
          parameters: c.parameters.map((p) => {
            return {
              name: p.parameterName,
              score: p.score,
            };
          }),
          total_score: (c.parameters.reduce((acc, p) => acc + p.score, 0) / c.parameters.length) * 100,
        };
        return crit;
      }),
    });
    application.resume_analysis = savedScore;
    application.scoring_criteria_version = appJob.scoring_criteria.version;
    application.resume_score = calcResumeScore(savedScore, appJob.scoring_criteria);
    await application.save();
    return savedScore;
  }

  @OnWorkerEvent("active")
  async onActive(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} ACTIVE!`);
    await this.applicationService.updateParseStatus(job.data.applicationId, "scoring", {
      error: null,
      percentage: job.progress as number,
      status: "processing",
      retry_count: job.attemptsMade,
    });
  }

  @OnWorkerEvent("progress")
  async onProgress(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} PROGRESS!`);
    await this.applicationService.updateParseStatus(job.data.applicationId, "scoring", {
      error: null,
      percentage: job.progress as number,
      status: "processing",
      retry_count: job.attemptsMade,
    });
  }

  @OnWorkerEvent("completed")
  async onCompleted(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} COMPLETED!`);
    await this.applicationService.updateParseStatus(job.data.applicationId, "scoring", {
      error: null,
      percentage: job.progress as number,
      status: "completed",
      retry_count: job.attemptsMade,
    });
  }

  @OnWorkerEvent("failed")
  async onFailed(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} FAILED!`, job.failedReason);
    await this.applicationService.updateParseStatus(job.data.applicationId, "scoring", {
      error: {
        type: "client",
        message: job.failedReason,
      },
      percentage: job.progress as number,
      status: "failed",
      retry_count: job.attemptsMade,
    });
  }
}
