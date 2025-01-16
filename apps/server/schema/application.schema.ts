import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

import { Job } from "./job.schema";

export type CandidateDocument = HydratedDocument<Application>;

@Schema()
export class Education {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  institution: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  field_of_study: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  grade: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  type: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  degree: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  start_date: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    default: "",
  })
  end_date: string;
  @Prop({
    type: MongooseSchema.Types.Boolean,
    required: true,
    default: false,
  })
  is_currently_studying: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  description: string;
}
// Generate a Mongoose Schema before use as Subdocument
const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
export class Experience {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  title: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    enum: ["full-time", "part-time", "contract", "internship", "temporary"],
  })
  employment_type: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  location: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  description: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    enum: ["remote", "onsite", "hybrid"],
  })
  location_type: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  start_date: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  end_date: string;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    required: true,
  })
  is_currently_working: string;
}
// Generate a Mongoose Schema before use as Subdocument
const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
export class SocialLink {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    enum: ["linkedin", "github", "twitter", "facebook", "instagram", "x", "blog"],
  })
  name: string;
  @Prop()
  url: string;
}

const SocialLinkSchema = SchemaFactory.createForClass(SocialLink);

@Schema()
export class Application {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  first_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  last_name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.String, required: false })
  phone: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  current_role: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  location: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  resume_url: string;

  @Prop({ type: [MongooseSchema.Types.String], required: true })
  skills: string[];

  @Prop({ type: [EducationSchema], required: false })
  education: Education[];

  @Prop({ type: [ExperienceSchema], required: false })
  experience: Experience[];

  @Prop({ type: [SocialLinkSchema], required: false })
  Social: SocialLink[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Job" })
  job: Job; // Reference to the Job schema
  // socials
  // created application, resume -parsing,resume-parse-failed,resume-parsed, resume-scoring, resume-scored, resume-score-failed,
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
