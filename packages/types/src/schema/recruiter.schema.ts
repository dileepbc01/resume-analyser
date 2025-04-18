import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

import { Job } from "./job.schema";

export type RecruiterDocument = HydratedDocument<Recruiter>;

@Schema()
export class Recruiter {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  first_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  last_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true, unique: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: "Job" }],
    default: [],
  })
  jobs: Job[];

  @Prop({ type: MongooseSchema.Types.String })
  refresh_token: string;
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
