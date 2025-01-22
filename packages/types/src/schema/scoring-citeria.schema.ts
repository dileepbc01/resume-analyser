import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Model, Schema as MongooseSchema } from "mongoose";
import { Job } from "./job.schema";

@Schema()
export class Parameter{
    @Prop({
        type: MongooseSchema.Types.String,
        required: true
    })
    key: string;
    @Prop({
        type: MongooseSchema.Types.String,
        required: true
    })
    name: string
}
const ParameterSchema = SchemaFactory.createForClass(Parameter);
@Schema()
export class ScoringCriteria{

    @Prop({
        type:MongooseSchema.Types.String,
        required:true
    })
    criteria_name: string;

    // @Prop({
    //     type:[ParameterSchema],
    //     required: true
    // })
    // parameters: Parameter[]

    @Prop({
        type:[MongooseSchema.Types.String],
        required: true
    })
    parameters: string[]

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true
    })
    importance: number

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true
    })
    order: number

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Job" })
    job: Job;
}


export const ScoringCriteriaSchema = SchemaFactory.createForClass(ScoringCriteria);