import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  role: string;
  @Prop({ type: MongooseSchema.Types.String, required: true })
  type: string; // full-time, part-time, contract, etc.
  @Prop({ type: MongooseSchema.Types.String, required: true })
  location: string;
  @Prop({ type: MongooseSchema.Types.String, required: true })
  description: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
