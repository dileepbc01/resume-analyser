import { BullModule } from "@nestjs/bullmq";

export enum AppQueueEnum {
  RESUME_PARSE = "resume-parse",
  RESUME_SCORE = "resume-score",
}

export enum FileMimeTypes {
  PDF = "application/pdf",
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  TXT = "text/plain",
  ODT = "application/vnd.oasis.opendocument.text",
  JPEG = "image/jpeg",
}
export type QueuePayload = {
  [AppQueueEnum.RESUME_PARSE]: {
    applicationId: string;
    jobId: string;
    resumeFileUrl: string;
    mimeType: FileMimeTypes;
    resumeFileName: string;
  };
  [AppQueueEnum.RESUME_SCORE]: {
    application_id: string;
  };
};

export const AppQueues = [BullModule.registerQueue({ name: AppQueueEnum.RESUME_PARSE })];

export const videoQueue = BullModule.registerQueue({ name: "video" });
