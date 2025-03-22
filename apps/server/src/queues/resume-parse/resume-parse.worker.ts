import { InjectQueue, OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bullmq";
import { ApplicationService } from "src/application/application.service";
import { LangchainService } from "src/langchain/langchain.service";
import { ResumeSchema } from "src/langchain/resume.schema";
import { z } from "zod";

import { AppQueueEnum, FileMimeTypes, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_PARSE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeParseProcessor extends WorkerHost {
  constructor(
    @InjectQueue(AppQueueEnum.RESUME_SCORE)
    private readonly resumeScoringQueue: Queue<QueuePayload["resume-score"]>,
    private langchainService: LangchainService,
    private applicationService: ApplicationService
  ) {
    super();
  }
  async process(job: Job<QueuePayload["resume-parse"]>) {
    const docMimeTypes: FileMimeTypes[] = [
      FileMimeTypes.PDF,
      FileMimeTypes.DOC,
      FileMimeTypes.DOCX,
      FileMimeTypes.ODT,
      FileMimeTypes.TXT,
    ];
    const imageMimeTypes: FileMimeTypes[] = [FileMimeTypes.JPEG];
    let text = "";
    if (docMimeTypes.includes(job.data.mimeType)) {
      text = await this.langchainService.generateText(job.data.resumeFileUrl);
      await job.updateProgress(50);
    } else if (imageMimeTypes.includes(job.data.mimeType)) {
      throw new Error("Image parsing not supported yet");
    }
    const json = await this.langchainService.getStructuredData(text);

    this.applicationService.updateParsedDetails({
      application_id: job.data.applicationId,
      job_id: job.data.jobId,
      resume_json: json,
      resume_text: text,
      resume_url: job.data.resumeFileUrl,
    });

    await job.updateProgress(100);
  }

  @OnWorkerEvent("active")
  async onActive(job: Job<QueuePayload["resume-parse"]>) {
    await this.applicationService.updateParseStatus(job.data.applicationId, "parse", {
      error: null,
      percentage: 0,
      status: "processing",
      retry_count: job.attemptsMade,
    });
    console.info(`Processing job with id ${job.id}`);
  }

  @OnWorkerEvent("progress")
  async onProgress(job: Job<QueuePayload["resume-parse"]>) {
    await this.applicationService.updateParseStatus(job.data.applicationId, "parse", {
      error: null,
      percentage: job.progress as number,
      status: "processing",
      retry_count: job.attemptsMade,
    });
  }

  @OnWorkerEvent("completed")
  async onCompleted(job: Job<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} COMPLETED!`);
    await this.applicationService.updateParseStatus(job.data.applicationId, "parse", {
      error: null,
      percentage: job.progress as number,
      status: "completed",
      retry_count: job.attemptsMade,
    });
    this.resumeScoringQueue.add("score-resume", {
      applicationId: job.data.applicationId,
    });
  }

  @OnWorkerEvent("failed")
  async onFailed(job: Job<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} FAILED! Attempt Number ${job.attemptsMade}`);
    console.info("Failed reason", job.failedReason);

    await this.applicationService.updateParseStatus(job.data.applicationId, "parse", {
      error: {
        type: "client", //TODO: classify the errors
        message: job.failedReason,
      },
      percentage: 0,
      status: "failed",
      retry_count: job.attemptsMade,
    });
  }
}
