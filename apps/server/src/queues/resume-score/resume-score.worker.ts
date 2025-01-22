import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";
import { LangchainService } from "src/langchain/langchain.service";

import { AppQueueEnum, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_SCORE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeScoreProcessor extends WorkerHost {
  constructor(private langchainService: LangchainService) {
    super();
  }
  async process(job: Job<QueuePayload["resume-score"]>) {
    //
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
