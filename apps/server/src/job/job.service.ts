import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateJobDto, GetJobDto, Job, ScoringCriteria, UpdateJobDto } from "@repo/types";
import { Model } from "mongoose";
import { defaultScoringCriteria } from "src/utils/defaultScoringCriteria";

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(ScoringCriteria.name) private ScoringCritModel: Model<ScoringCriteria>
  ) {}

  async createJob(createJobDto: CreateJobDto, recruiterId: string) {
    const job = await this.jobModel.create({ ...createJobDto, recruiter: recruiterId });
    await this.ScoringCritModel.insertMany(
      defaultScoringCriteria.map((criteria) => ({
        criteria_name: criteria.criteria_name,
        importance: criteria.importance,
        order: criteria.order,
        parameters: criteria.parameters,
        job: job._id,
      }))
    );
    return job;
  }
}
