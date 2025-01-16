import { z } from "zod";

const BasicsSchema = z.object({
  full_name: z.string().nullish().describe("Full name of the individual"),
  email: z.string().nullish().describe("Email address of the individual"),
  phone: z.string().nullish().describe("Phone number of the individual"),
  current_role: z.string().nullish().describe("Current role of the individual"),
  location: z.string().nullish().describe("Location of the individual"),
  resume_url: z.string().nullish().describe("URL to the resume of the individual"),
});

const AwardItemSchema = z.object({
  title: z.string().nullish(),
  awarder: z.string().nullish(),
  date: z.string().nullish(),
  summary: z.string().nullish(),
  url: z.string().nullish(),
});

const CertificationItemSchema = z.object({
  title: z.string().nullish(),
  date: z.string().nullish(),
  summary: z.string().nullish(),
  url: z
    .object({
      label: z.string().nullish(),
      href: z.string().nullish(),
    })

    .default({ label: "", href: "" }),
});

const EducationItemSchema = z.object({
  institution: z.string().nullish().describe("Name of the institution"),
  field_of_study: z.string().nullish().describe("Field of study"),
  grade: z.string().nullish().describe("Grade achieved"),
  type: z.string().nullish().describe("Type of education"),
  degree: z.string().nullish().describe("Degree obtained"),
  start_date: z.string().nullish().describe("Start date of the education"),
  end_date: z.string().nullish().describe("End date of the education"),
  is_currently_studying: z.boolean().describe("Is currently studying"),
  description: z.string().nullish().describe("Description of the education"),
});

const ExperienceItemSchema = z.object({
  title: z.string().nullish().describe("Title of the position"),
  employment_type: z
    .enum(["full-time", "part-time", "contract", "internship", "temporary"])
    .nullish()
    .describe("Type of employment"),
  location: z.string().nullish().describe("Location of the position"),
  description: z.string().nullish().describe("Description of the position"),
  location_type: z.enum(["remote", "onsite", "hybrid"]).nullish().describe("Type of location"),
  start_date: z.string().nullish().describe("Start date of the position"),
  end_date: z.string().nullish().describe("End date of the position"),
  is_currently_working: z.boolean().describe("Is currently working"),
});

const InterestItemSchema = z.object({
  name: z.string().nullish(),
});

const ProfileItemSchema = z.object({
  network: z.string().nullish(),
  url: z.string().nullish(),
});

const ProjectItemSchema = z.object({
  name: z.string().nullish(),
  description: z.string().nullish(),
});

const SkillItemSchema = z.object({
  name: z.string().nullish().describe("The name of the skill"),
  level: z.number().describe("The proficiency level of the skill"),
});

export const ResumeSchema = z.object({
  basics: BasicsSchema.describe("Basic information about the individual"),
  summary: z.string().nullish().describe("A brief summary about the individual"),
  awards: AwardItemSchema.array().default([]).describe("Awards received by the individual"),
  certifications: CertificationItemSchema.array()
    .default([])
    .describe("Certifications obtained by the individual"),
  education: EducationItemSchema.array().default([]).describe("Educational background of the individual"),
  experience: ExperienceItemSchema.array().default([]).describe("Work experience of the individual"),
  interests: InterestItemSchema.array().default([]).describe("Interests of the individual"),
  profiles: ProfileItemSchema.array().default([]).describe("Online profiles of the individual"),
  projects: ProjectItemSchema.array().default([]).describe("Projects undertaken by the individual"),
  skills: SkillItemSchema.array().default([]).describe("Skills possessed by the individual"),
});
