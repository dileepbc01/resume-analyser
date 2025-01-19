import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateJobDto, GetJobDto, Job, JobStatus, ScoringCriteria, UpdateJobDto } from "@repo/types";
import { Model } from "mongoose";
import { defaultScoringCriteria } from "src/utils/defaultScoringCriteria";

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(ScoringCriteria.name) private ScoringCritModel: Model<ScoringCriteria>
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job = await this.jobModel.create(createJobDto);
    await this.ScoringCritModel.insertMany(
      defaultScoringCriteria.map((criteria) => ({ ...criteria, job: job._id }))
    );

    return job;
  }

  async findAll() {
    return this.jobModel.find().exec();
  }

  async findOne(getJobDto: GetJobDto) {
    const job = await this.jobModel.findById(getJobDto.id).exec();
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobModel.findByIdAndUpdate(
      id,
      {
        ...updateJobDto,
      },
      {
        new: true,
      }
    );
    return job;
  }
  async archive(id: string) {
    return await this.jobModel.findByIdAndUpdate(id, { status: JobStatus.ARCHIVED }, { new: true }).exec();
  }

  async addApplications() {
    //
  }
}
