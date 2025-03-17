import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobSchema, ScoringCriteria, ScoringCriteriaSchema } from "@repo/types";
import { Job } from "bullmq";
import { LangchainService } from "src/langchain/langchain.service";

import { JobController } from "./job.controller";
import { JobService } from "./job.service";

const JobModel = MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]);
const ScoringCriteriaModel = MongooseModule.forFeature([
  { name: ScoringCriteria.name, schema: ScoringCriteriaSchema },
]);

@Module({
  imports: [JobModel, ScoringCriteriaModel],
  controllers: [JobController],
  providers: [JobService, LangchainService],
  exports: [JobModel],
})
export class JobModule {}
