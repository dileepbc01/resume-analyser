import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";

export enum AppQueueEnum {
  RESUME_PARSE = "resume-parse",
  RESUME_SCORE = "resume-score",
  RESUME_RESCORE = "resume-re-score",
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
    applicationId: string;
  };
  [AppQueueEnum.RESUME_RESCORE]: {
    jobId: string;
  };
};

export const AppQueues = [
  BullModule.registerQueue({ name: AppQueueEnum.RESUME_PARSE }),
  BullModule.registerQueue({ name: AppQueueEnum.RESUME_SCORE }),
  BullModule.registerQueue({ name: AppQueueEnum.RESUME_RESCORE }),
  BullBoardModule.forFeature({
    name: AppQueueEnum.RESUME_PARSE,
    adapter: BullMQAdapter, //or use BullAdapter if you're using bull instead of bullMQ
  }),
  BullBoardModule.forFeature({
    name: AppQueueEnum.RESUME_SCORE,
    adapter: BullMQAdapter, //or use BullAdapter if you're using bull instead of bullMQ
  }),
  BullBoardModule.forFeature({
    name: AppQueueEnum.RESUME_RESCORE,
    adapter: BullMQAdapter, //or use BullAdapter if you're using bull instead of bullMQ
  }),
];
