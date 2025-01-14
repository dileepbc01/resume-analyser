import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Job, JobStatus } from "schema/job.schema";

import { CreateJobDto } from "./dto/create-job.dto";
import { GetJobDto } from "./dto/get-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  create(createJobDto: CreateJobDto) {
    return this.jobModel.create(createJobDto);
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
