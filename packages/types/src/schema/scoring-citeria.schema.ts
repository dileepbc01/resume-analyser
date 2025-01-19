import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Job } from "./job.schema";


@Schema()
export class ScoringCriteria{

    @Prop({
        type:MongooseSchema.Types.String,
        required:true
    })
    criteria_name: string;

    @Prop({
        type: [MongooseSchema.Types.String],
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