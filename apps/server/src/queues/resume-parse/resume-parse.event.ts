import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";

import { AppQueueEnum } from "../app-queues";

@QueueEventsListener(AppQueueEnum.RESUME_PARSE)
export class ResumeParseEventsListener extends QueueEventsHost {
  logger = new Logger("Queue");
  @OnQueueEvent("added")
  onAdded(job: { jobId: string; name: string }) {
    this.logger.log(`Job ${job.jobId} has been added to the queue`);
  }
}
