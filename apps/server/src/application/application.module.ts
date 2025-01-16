import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Application, ApplicationSchema } from "schema/application.schema";
import { AppQueues, videoQueue } from "src/queues/app-queues";
import { ResumeParseEventsListener } from "src/queues/resume-parse/resume-parse.event";
import { ResumeParseProcessor } from "src/queues/resume-parse/resume-parse.worker";
import { S3Service } from "src/s3/s3.service";

import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]), ...AppQueues],

  controllers: [ApplicationController],
  providers: [ApplicationService, S3Service, ResumeParseProcessor, ResumeParseEventsListener],
})
export class ApplicationModule {}
