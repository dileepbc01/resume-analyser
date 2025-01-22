import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

import { Application } from "./application.schema";
import { Recruiter } from "./recruiter.schema";

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
class ScoringWeights {
  @Prop({ type: MongooseSchema.Types.Number, default: 30, min: 0, max: 100 })
  technical_competence: number;

  @Prop({ type: MongooseSchema.Types.Number, default: 25, min: 0, max: 100 })
  proffessional_experience_impact: number;

  @Prop({ type: MongooseSchema.Types.Number, default: 20, min: 0, max: 100 })
  education: number;

  @Prop({ type: MongooseSchema.Types.Number, default: 15, min: 0, max: 100 })
  leadership_soft_skills: number;

  @Prop({ type: MongooseSchema.Types.Number, default: 10, min: 0, max: 100 })
  role_alignment_cultural_fit: number;
}

const ScoringWeightsSchema = SchemaFactory.createForClass(ScoringWeights);

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

  @Prop({
    type: ScoringWeightsSchema,
    default: {
      technical_competence: 30,
      proffessional_experience_impact: 25,
      education: 20,
      leadership_soft_skills: 15,
      role_alignment_cultural_fit: 10,
    },
    required: false,
  })
  scoring_weights: ScoringWeights;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Recruiter" })
  recruiter: Recruiter;
}

export const JobSchema = SchemaFactory.createForClass(Job);
