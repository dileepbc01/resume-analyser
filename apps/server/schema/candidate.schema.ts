import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema()
export class Education {
  @Prop()
  name: string;
}
// Generate a Mongoose Schema before use as Subdocument
const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
export class Experience {
  @Prop()
  name: string;
}
// Generate a Mongoose Schema before use as Subdocument
const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
export class SocialLink {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    enum: [
      'linkedin',
      'github',
      'twitter',
      'facebook',
      'instagram',
      'x',
      'blog',
    ],
  })
  name: string;
  @Prop()
  url: string;
}

const SocialLinkSchema = SchemaFactory.createForClass(SocialLink);

@Schema()
export class Candidate {
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

  // socials
}
