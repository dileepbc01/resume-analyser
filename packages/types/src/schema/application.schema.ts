import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

import { Job } from "./job.schema";
import { ResumeScore, ResumeScoreSchema } from "./resume-score.schema";

export type CandidateDocument = HydratedDocument<Application>;

@Schema()
export class Education {
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  institution: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  field_of_study: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  grade: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  type: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  degree: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  start_date: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  end_date: string;
  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  is_currently_studying: boolean;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  description: string;
}
// Generate a Mongoose Schema before use as Subdocument
const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
export class Experience {
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  title: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
    enum: ["full-time", "part-time", "contract", "internship", "temporary"],
  })
  employment_type: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  location: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  description: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
    enum: ["remote", "onsite", "hybrid"],
  })
  location_type: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  start_date: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  end_date: string;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  is_currently_working: boolean;
}
// Generate a Mongoose Schema before use as Subdocument
const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
export class Profile {
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  name: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  url: string;
}

@Schema()
export class Skill {
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  name: string;
  @Prop({
    type: MongooseSchema.Types.Number,
    default: 0,
  })
  level: number;
}

const SkillSchema = SchemaFactory.createForClass(Skill);

const ProfileSchema = SchemaFactory.createForClass(Profile);

@Schema()
export class Application {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Date, default: Date.now() })
  created_at: Date;

  @Prop({ type: MongooseSchema.Types.Date, default: Date.now() })
  updated_at: Date;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  full_name: string;

  @Prop({ type: MongooseSchema.Types.String, default: null, unique: true })
  resume_file_name: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  resume_text: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  email: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  phone: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  current_role: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  location: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  resume_url: string;

  @Prop({ type: [SkillSchema], default: [] })
  skills: Skill[];

  @Prop({ type: [EducationSchema], default: [] })
  education: Education[];

  @Prop({ type: [ExperienceSchema], default: [] })
  experience: Experience[];

  @Prop({ type: [ProfileSchema], default: [] })
  profile: Profile[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Job" })
  job: Job; // Reference to the Job schema

  @Prop({ type: ResumeScoreSchema, ref: "ResumeScoreSchema", default: null })
  resume_analysis: ResumeScore;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
