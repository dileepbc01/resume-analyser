import { InjectQueue, OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application, Job, ScoringCriteria } from "@repo/types";
import { Job as BullJob, Queue } from "bullmq";
import { Model } from "mongoose";
import { LangchainService } from "src/langchain/langchain.service";
import { defaultScoringCriteria } from "src/utils/defaultScoringCriteria";

import { AppQueueEnum, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_SCORE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeScoreProcessor extends WorkerHost {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(ScoringCriteria.name) private scoringCriteria: Model<ScoringCriteria>,
    private langchainService: LangchainService
  ) {
    super();
  }
  async process(job: BullJob<QueuePayload["resume-score"]>) {
    const application = await this.applicationModel.findById(job.data.application_id);
    if (!application) {
      throw new Error("Application not found"); // TODO: custom error and logger
    }
    const appJob = await this.jobModel.findById(application.job);
    if (!appJob) {
      throw new Error("Job not found"); // TODO: custom error
    }
    const scoreCriterias = await this.scoringCriteria.find({
      job_id: application.job,
    });

    scoreCriterias.map(async (scoreCriteria) => {
      const criteriaData = defaultScoringCriteria.find(
        (criteria) => criteria.criteria_name === scoreCriteria.criteria_name
      );
      if (!criteriaData) {
        throw new Error("Schema not found"); // TODO: custom error
      }
      await this.langchainService.scoreResume(
        application.resume_text,
        appJob.description,
        scoreCriteria,
        criteriaData.schema
      );
    });
    // defaultScoringCriteria;
    // console.log("application", application, appJob);
  }

  @OnWorkerEvent("active")
  onActive(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} ACTIVE!`);
  }

  @OnWorkerEvent("progress")
  onProgress(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} PROGRESS!`);
  }

  @OnWorkerEvent("completed")
  onCompleted(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent("failed")
  onFailed(job: BullJob<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} FAILED!`);
  }
}
