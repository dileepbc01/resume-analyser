import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema } from "mongoose";

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
  start_date: String;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  end_date: String;
  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  is_currently_studying: boolean;

  @Prop({
    type: MongooseSchema.Types.String,
    default: "",
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
  })
  employment_type: string;
  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  location: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: "",
  })
  description: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  location_type: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  start_date: String;

  @Prop({
    type: MongooseSchema.Types.String,
    default: null,
  })
  end_date: String;

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


const STATUS_ENUMS = ["not_started", "processing", "completed", "failed"] as const;
type StatusEnum = (typeof STATUS_ENUMS)[number];

interface ErrorType {
  type: "server" | "client";
  message: string;
}

@Schema()
class JobProcessingStatus {
  @Prop({
    type:  MongooseSchema.Types.String,
    enum: STATUS_ENUMS,
    default: "not_started",
    required: true,
  })
  status: StatusEnum; // Corrected enum type
  @Prop({ required: true, default: 0 })
  percentage: number;
  @Prop({
    type: Object,
    required: false,
    default: null,
  })
  error: ErrorType | null;

  @Prop({
    type:  MongooseSchema.Types.Number,
    required:true,default:0
  })
  retry_count:number
}


const JobProcessingStatusSchema = SchemaFactory.createForClass(JobProcessingStatus);


@Schema()
export class Counter {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 1 })
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);

// Register the Counter model with Mongoose
@Schema()
export class Application {
  
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Number })
  application_number: number; //TODO: impl counter later

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

  @Prop({ type: MongooseSchema.Types.String,default:null })
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

  @Prop({
    type:JobProcessingStatusSchema,
    ref:"JobProcessingStatus",
    default:{}
  })
  parsing_status:JobProcessingStatus

   @Prop({
     type:JobProcessingStatusSchema,
     ref:"JobProcessingStatus",
     default:{}
  })
  scoring_status:JobProcessingStatus


  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "ResumeScore", default: null })
  resume_analysis: ResumeScore;
}



export const ApplicationSchema = SchemaFactory.createForClass(Application)
