import { BullModule } from "@nestjs/bullmq";

export enum AppQueueEnum {
  RESUME_PARSE = "resume-parse",
  RESUME_SCORE = "resume-score",
}

export type QueuePayload = {
  [AppQueueEnum.RESUME_PARSE]: {
    job_id: string;
    resume_file_url: string;
  };
  [AppQueueEnum.RESUME_SCORE]: {
    application_id: string;
  };
};

export const AppQueues = [BullModule.registerQueue({ name: AppQueueEnum.RESUME_PARSE })];

export const videoQueue = BullModule.registerQueue({ name: "video" });
