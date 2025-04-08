import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application, Job } from "@repo/types";
import { Job as BullJob } from "bullmq";
import { Model } from "mongoose";
import { calcResumeScore } from "src/utils/calcResumeScore";

import { AppQueueEnum, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_RESCORE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeReScoreProcessor extends WorkerHost {
  private PAGE_SIZE = 100;

  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(Job.name) private jobModel: Model<Job>
  ) {
    super();
  }

  async process(job: BullJob<QueuePayload["resume-re-score"]>) {
    const appJob = await this.jobModel.findById(job.data.jobId).populate("scoring_criteria");
    if (!appJob) {
      throw new Error("No Job Found");
    }

    const applications = await this.applicationModel.find({ job: appJob }).populate("resume_analysis");

    await Promise.all(
      await applications.map(async (application) => {
        try {
          if (!application.resume_analysis) {
            return;
          }
          application.scoring_criteria_version = appJob.scoring_criteria.version;
          application.scoring_status = {
            ...application.scoring_status,
            percentage: 50,
            status: "processing",
          };
          await application.save();
          application.resume_score = calcResumeScore(application.resume_analysis, appJob.scoring_criteria);

          application.scoring_status = {
            ...application.scoring_status,
            percentage: 100,
            status: "completed",
          };
          await application.save();
        } catch (error) {
          console.error(`Failed to process application ${application._id}:`, error);
        }
      })
    );
  }

  @OnWorkerEvent("active")
  async onActive(job: BullJob<QueuePayload["resume-re-score"]>) {
    // await this.applicationService.updateParseStatus(job.data.applicationId, "scoring", {
    //   error: null,
    //   percentage: job.progress as number,
    //   status: "processing",
    //   retry_count: job.attemptsMade,
    // });
  }

  @OnWorkerEvent("progress")
  async onProgress(job: BullJob<QueuePayload["resume-re-score"]>) {
    console.info(`Job with id ${job.id} PROGRESS!`);
  }

  @OnWorkerEvent("completed")
  async onCompleted(job: BullJob<QueuePayload["resume-re-score"]>) {
    console.info(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent("failed")
  async onFailed(job: BullJob<QueuePayload["resume-re-score"]>) {
    console.info(`Job with id ${job.id} FAILED!`, job.failedReason);
  }
}
