import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Application,
  ApplicationSchema,
  JobSchema,
  ScoringCriteria,
  ScoringCriteriaSchema,
} from "@repo/types";
import { Job } from "bullmq";
import { LangchainService } from "src/langchain/langchain.service";
import { AppQueues } from "src/queues/app-queues";
import { ResumeReScoreEventsListener } from "src/queues/resume-rescore/resume-rescore.event";
import { ResumeReScoreProcessor } from "src/queues/resume-rescore/resume-rescore.worker";

import { JobController } from "./job.controller";
import { JobService } from "./job.service";

const JobModel = MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]);
const ScoringCriteriaModel = MongooseModule.forFeature([
  { name: ScoringCriteria.name, schema: ScoringCriteriaSchema },
  { name: Application.name, schema: ApplicationSchema },
]);

@Module({
  imports: [JobModel, ScoringCriteriaModel, ...AppQueues],
  controllers: [JobController],
  providers: [JobService, LangchainService, ResumeReScoreProcessor, ResumeReScoreEventsListener],
  exports: [JobModel],
})
export class JobModule {}
