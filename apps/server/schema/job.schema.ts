import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Candidate } from 'src/candidate/entities/candidate.entity';

export type JobDocument = HydratedDocument<Job>;

enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  TEMPORARY = 'temporary',
}
@Schema()
export class Job {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  role: string;
  @Prop({ required: true })
  type: JobType; // full-time, part-time, contract, etc.
  @Prop({ type: MongooseSchema.Types.String, required: true })
  location: string;
  @Prop({ type: MongooseSchema.Types.String, required: true })
  description: string;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Candidate' }],
  })
  candidates: Candidate[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
