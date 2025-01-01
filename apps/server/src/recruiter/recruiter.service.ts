import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recruiter } from 'schema/recruiter.schema';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectModel(Recruiter.name) private recruiterModel: Model<Recruiter>,
  ) {}

  async find(recruiter_id: string): Promise<Recruiter> {
    const recruiter = await this.recruiterModel.findById(recruiter_id).exec();
    if (recruiter !== null) {
      return recruiter;
    }
    throw new HttpException('Recruiter not found', HttpStatus.NOT_FOUND);
  }

  async create(createRecruiterDto: CreateRecruiterDto): Promise<Recruiter> {
    const createdRecruiter = new this.recruiterModel(createRecruiterDto);
    return createdRecruiter.save();
  }
}
