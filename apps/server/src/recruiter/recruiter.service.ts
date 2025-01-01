import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recruiter } from 'schema/recruiter.schema';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RecruiterService {
  constructor(
    @InjectModel(Recruiter.name) private recruiterModel: Model<Recruiter>,
  ) {}

  async findByEmail(email: string): Promise<Recruiter> {
    const recruiter = await this.recruiterModel.findOne({ email }).exec();
    if (recruiter !== null) {
      return recruiter;
    }
    throw new HttpException('Recruiter not found', HttpStatus.NOT_FOUND);
  }
  async find(recruiter_id: string): Promise<Recruiter> {
    const recruiter = await this.recruiterModel.findById(recruiter_id).exec();
    if (recruiter !== null) {
      return recruiter;
    }
    throw new HttpException('Recruiter not found', HttpStatus.NOT_FOUND);
  }

  async create(createRecruiterDto: CreateRecruiterDto): Promise<Recruiter> {
    const hash = await bcrypt.hash(createRecruiterDto.password, 10);
    const createdRecruiter = new this.recruiterModel({
      ...createRecruiterDto,
      password: hash,
    });
    return createdRecruiter.save();
  }
}
