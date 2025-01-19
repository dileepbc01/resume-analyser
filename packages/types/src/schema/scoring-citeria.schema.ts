import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Schema as MongooseSchema } from "mongoose";
import { Job } from "./job.schema";

@Schema()
export class ScoringCriteria{

    @Prop({
        type:MongooseSchema.Types.String,
        required:true
    })
    criteria_name: string;

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