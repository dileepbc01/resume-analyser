import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Application } from "./application.schema";

@Schema()
class Parameter {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
  })
  score: number;
}

const ParameterSchema = SchemaFactory.createForClass(Parameter);

@Schema()
export class ResumeScoreCriteria {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  criteria_name: string;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
  })
  total_score: number;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  justification: string;

  @Prop({
    type: [ParameterSchema],
    default: [],
  })
  parameters: Parameter[];

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
  })
  order: number;
}

export const ResumeScoreCriteriasSchema = SchemaFactory.createForClass(ResumeScoreCriteria);

@Schema()
export class ResumeScore {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [ResumeScoreCriteriasSchema],
    ref: "ResumeScoreCriteria",
    required: true,
  })
  criterias: ResumeScoreCriteria[];
}

export const ResumeScoreSchema = SchemaFactory.createForClass(ResumeScore);
