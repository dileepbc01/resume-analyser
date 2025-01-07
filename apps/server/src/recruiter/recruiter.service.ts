import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recruiter } from 'schema/recruiter.schema';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import * as bcrypt from 'bcrypt';
import { RemoveRecruiterDto } from './dto/remove-recruiter.dto';
@Injectable()
export class RecruiterService {
  constructor(
    @InjectModel(Recruiter.name) private recruiterModel: Model<Recruiter>,
  ) {}

  async findAll(): Promise<Recruiter[]> {
    return this.recruiterModel.find().exec();
  }
  async findByEmail(email: string) {
    return await this.recruiterModel.findOne({ email }).exec();
  }

  async findByRecruiterId(id: string) {
    return await this.recruiterModel.findOne({ _id: id }).exec();
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
  async remove(removeRecruiterDto: RemoveRecruiterDto) {
    await this.recruiterModel
      .findOneAndDelete({
        id: removeRecruiterDto.id,
      })
      .exec();
  }
  async update(
    recruiter_id: string,
    updateRecruiterDto: Partial<CreateRecruiterDto>,
  ): Promise<Recruiter> {
    const updatedRecruiter = await this.recruiterModel
      .findByIdAndUpdate(recruiter_id, updateRecruiterDto, { new: true })
      .exec();
    if (updatedRecruiter !== null) {
      return updatedRecruiter;
    }
    throw new HttpException('Recruiter not found', HttpStatus.NOT_FOUND);
  }
}
