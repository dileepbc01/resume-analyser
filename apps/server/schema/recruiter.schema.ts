import { Job } from './job.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RecruiterDocument = HydratedDocument<Recruiter>;

@Schema()
export class Recruiter {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  first_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  last_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true, unique: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  jobs: Job[];
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
