import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobSchema, ScoringCriteria, ScoringCriteriaSchema } from "@repo/types";
import { Job } from "bullmq";

import { JobController } from "./job.controller";
import { JobService } from "./job.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    MongooseModule.forFeature([{ name: ScoringCriteria.name, schema: ScoringCriteriaSchema }]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
