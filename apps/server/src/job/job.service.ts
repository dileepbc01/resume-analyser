import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobStatus } from 'schema/job.schema';
import { Model } from 'mongoose';
import { GetJobDto } from './dto/get-job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  create(createJobDto: CreateJobDto) {
    console.log('dto', createJobDto);
    return this.jobModel.create(createJobDto);
  }

  async findAll() {
    return this.jobModel.find().exec();
  }

  async findOne(getJobDto: GetJobDto) {
    return this.jobModel.findById(getJobDto.id).exec();
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { new: true })
      .exec();
  }
  async archive(id: string) {
    await this.jobModel
      .findByIdAndUpdate(id, { status: JobStatus.ARCHIVED }, { new: true })
      .exec();
  }
}
