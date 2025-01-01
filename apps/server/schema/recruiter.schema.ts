import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RecruiterDocument = HydratedDocument<Recruiter>;

@Schema()
export class Recruiter {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  first_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  last_name: string;

  @Prop(Number)
  email: number;
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
