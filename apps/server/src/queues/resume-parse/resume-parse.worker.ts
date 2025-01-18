import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";
import { ApplicationService } from "src/application/application.service";
import { LangchainService } from "src/langchain/langchain.service";
import { ResumeSchema } from "src/langchain/resume.schema";
import { z } from "zod";

import { AppQueueEnum, FileMimeTypes, QueuePayload } from "../app-queues";

@Injectable()
@Processor(AppQueueEnum.RESUME_PARSE, { concurrency: 3 }) // Can run up to 3 jobs concurrently
export class ResumeParseProcessor extends WorkerHost {
  constructor(
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
    await job.updateProgress(50);
    return {
      resumeJson: json,
      resumeText: text,
    };
  }

  @OnWorkerEvent("active")
  onActive(job: Job<QueuePayload["resume-parse"]>) {
    console.info(`Processing job with id ${job.id}`);
  }

  @OnWorkerEvent("progress")
  onProgress(job: Job<QueuePayload["resume-parse"]>) {
    console.info(`Job ${job.id} is in progress: ${job.progress}% completed.`);
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job<QueuePayload["resume-parse"]>) {
    const returnvalue = job.returnvalue as {
      resumeJson: z.infer<typeof ResumeSchema>;
      resumeText: string;
    };
    this.applicationService.updateParsedDetails({
      application_id: job.data.applicationId,
      job_id: job.data.jobId,
      resume_json: returnvalue.resumeJson,
      resume_text: returnvalue.resumeText,
      resume_url: job.data.resumeFileUrl,
    });
    console.info(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job<QueuePayload["resume-parse"]>) {
    console.info(`Job with id ${job.id} FAILED! Attempt Number ${job.attemptsMade}`);
    console.info("Failed reason", job.failedReason);
  }
}
