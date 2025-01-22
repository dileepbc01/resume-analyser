import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobSchema, ScoringCriteria, ScoringCriteriaSchema } from "@repo/types";
import { Job } from "bullmq";

import { JobController } from "./JobController";
import { JobService } from "./job.service";

const JobModel = MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]);
const ScoringCriteriaModel = MongooseModule.forFeature([
  { name: ScoringCriteria.name, schema: ScoringCriteriaSchema },
]);

@Module({
  imports: [JobModel, ScoringCriteriaModel],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobModel],
})
export class JobModule {}
