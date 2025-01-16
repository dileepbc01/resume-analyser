import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

import { AppQueueEnum, AppQueues, QueuePayload } from "../app-queues";

@Processor(AppQueueEnum.RESUME_PARSE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeParseProcessor extends WorkerHost {
  async process(job: Job<QueuePayload["resume-parse"]>) {
    const totalSteps = 5;
    await this.runTaskWithProgress(job, totalSteps);

    switch (job.name) {
      //   case "compress":
      //     console.log("Starting compress task");
      //     await this.runTaskWithProgress(job, totalSteps);

      //     break;

      //   case "process":
      //     console.log("Starting process task");

      //     break;

      default:
        console.log(`Unknown job name: ${job.name}`);
        break;
    }
  }

  async runTaskWithProgress(job: Job, totalSteps: number) {
    // console.log(job);
    for (let step = 1; step <= totalSteps; step++) {
      // Simulate work for each step with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Calculate progress as a percentage
      const progress = Math.round((step / totalSteps) * 100);

      // Update job progress
      await job.updateProgress(progress);
    }
  }

  @OnWorkerEvent("active")
  onActive(job: Job<QueuePayload["resume-parse"]>) {
    console.log(`Processing job with id ${job.id}`);
  }

  @OnWorkerEvent("progress")
  onProgress(job: Job<QueuePayload["resume-parse"]>) {
    console.log(`Job ${job.id} is in progress: ${job.progress}% completed.`);
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job<QueuePayload["resume-parse"]>) {
    console.log(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job<QueuePayload["resume-parse"]>) {
    console.log(`Job with id ${job.id} FAILED! Attempt Number ${job.attemptsMade}`);
  }
}
