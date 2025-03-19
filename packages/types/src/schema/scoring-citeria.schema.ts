import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { Job } from "./job.schema";

@Schema()
export class Parameter {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  key: string;
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;
}
const ParameterSchema = SchemaFactory.createForClass(Parameter);

@Schema()
export class Criteria {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  criteria_name: string;

  @Prop({
    type: [MongooseSchema.Types.String],
    required: true,
  })
  parameters: string[];

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
  })
  importance: number;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
  })
  order: number;
}

const CriteriaSchema = SchemaFactory.createForClass(Criteria);

@Schema()
export class ScoringCriteria {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [CriteriaSchema],
    default: [],
  })
  criterias: Criteria[];
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  scoring_instructions: string;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: true,
    default: 1,
  })
  version: number;
}

export const ScoringCriteriaSchema = SchemaFactory.createForClass(ScoringCriteria);
