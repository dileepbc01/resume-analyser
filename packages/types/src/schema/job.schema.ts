import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

import { Application } from "./application.schema";
import { Recruiter } from "./recruiter.schema";
import { ScoringCriteria } from "./scoring-citeria.schema";

export type JobDocument = HydratedDocument<Job>;

enum JobType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
  TEMPORARY = "temporary",
}
export enum JobStatus {
  SAVING = "SAVING",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "archived",
}

@Schema()
export class Job {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  role: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: JobType.FULL_TIME,
  })
  type: JobType; // full-time, part-time, contract, etc.

  @Prop({
    type: MongooseSchema.Types.String,
    default: "",
  })
  location: string;

  @Prop({ type: MongooseSchema.Types.String, default: "" })
  company: string;

  @Prop({ type: MongooseSchema.Types.String, default: "" })
  description: string;

  @Prop({ type: MongooseSchema.Types.String, default: JobStatus.SAVING })
  status: JobStatus;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: "Application" }],
  })
  candidates: Application[]; // One-to-many relationship with Candidate

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Recruiter" })
  recruiter: Recruiter;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "ScoringCriteria",
    required: true,
  })
  scoringCriteria: ScoringCriteria;
}

export const JobSchema = SchemaFactory.createForClass(Job);
