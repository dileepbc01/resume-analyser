import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Application, ApplicationSchema, ResumeScore, ResumeScoreSchema } from "@repo/types";
import { JobModule } from "src/job/job.module";
import { LangchainService } from "src/langchain/langchain.service";
import { AppQueues } from "src/queues/app-queues";
import { ResumeParseEventsListener } from "src/queues/resume-parse/resume-parse.event";
import { ResumeParseProcessor } from "src/queues/resume-parse/resume-parse.worker";
import { ResumeScoreEventsListener } from "src/queues/resume-score/resume-score.event";
import { ResumeScoreProcessor } from "src/queues/resume-score/resume-score.worker";
import { S3Service } from "src/s3/s3.service";

import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: ResumeScore.name, schema: ResumeScoreSchema },
    ]),
    JobModule,
    ...AppQueues,
  ],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    LangchainService,
    S3Service,
    ResumeScoreProcessor,
    ResumeScoreEventsListener,
    ResumeParseProcessor,
    ResumeParseEventsListener,
  ],
})
export class ApplicationModule {}
