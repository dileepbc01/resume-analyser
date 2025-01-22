import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application } from "@repo/types";
import { Job } from "bullmq";
import { Model } from "mongoose";
import { LangchainService } from "src/langchain/langchain.service";

import { AppQueueEnum, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_SCORE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeScoreProcessor extends WorkerHost {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    private langchainService: LangchainService
  ) {
    super();
  }
  async process(job: Job<QueuePayload["resume-score"]>) {
    const application = await this.applicationModel.findById(job.data.application_id);
    if (!application) {
      throw new Error("Application not found"); // TODO: custom error and logger
    }
    const appJob = await this.jobModel.findById(application.job);
    if (!job) {
      throw new Error("Job not found"); // TODO: custom error and logger
    }
    console.log("application", application, appJob);
  }

  @OnWorkerEvent("active")
  onActive(job: Job<QueuePayload["resume-parse"]>) {
    //
  }

  @OnWorkerEvent("progress")
  onProgress(job: Job<QueuePayload["resume-parse"]>) {
    //
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job<QueuePayload["resume-parse"]>) {
    // console.info(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job<QueuePayload["resume-parse"]>) {
    //
  }
}
