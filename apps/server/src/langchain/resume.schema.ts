import { z } from "zod";

const BasicsSchema = z.object({
  full_name: withDefault(z.string().nullish().describe("Full name of the individual"), ""),
  email: withDefault(z.string().nullish().describe("Email address of the individual"), ""),
  phone: withDefault(z.string().nullish().describe("Phone number of the individual"), ""),
  current_role: withDefault(z.string().nullish().describe("Current role of the individual"), ""),
  location: withDefault(z.string().nullish().describe("Location of the individual"), ""),
  resume_url: withDefault(z.string().nullish().describe("URL to the resume of the individual"), ""),
});

const AwardItemSchema = z.object({
  title: withDefault(z.string().nullish(), ""),
  awarder: withDefault(z.string().nullish(), ""),
  date: withDefault(z.string().nullish(), ""),
  summary: withDefault(z.string().nullish(), ""),
  url: withDefault(z.string().nullish(), ""),
});

const CertificationItemSchema = z.object({
  title: withDefault(z.string().nullish(), ""),
  date: withDefault(z.string().nullish(), ""),
  summary: withDefault(z.string().nullish(), ""),
  url: withDefault(
    z
      .object({
        label: withDefault(z.string().nullish(), ""),
        href: withDefault(z.string().nullish(), ""),
      })
      .nullish(),
    { label: "", href: "" }
  ),
});

const EducationItemSchema = z.object({
  institution: withDefault(z.string().nullish().describe("Name of the institution"), ""),
  field_of_study: withDefault(z.string().nullish().describe("Field of study"), ""),
  grade: withDefault(z.string().nullish().describe("Grade achieved"), ""),
  type: withDefault(z.string().nullish().describe("Type of education"), ""),
  degree: withDefault(z.string().nullish().describe("Degree obtained"), ""),
  start_date: withDefault(z.string().nullish().describe("Start date of the education"), ""),
  end_date: withDefault(z.string().nullish().describe("End date of the education"), ""),
  is_currently_studying: z.boolean().describe("Is currently studying"),
  description: withDefault(z.string().nullish().describe("Description of the education"), ""),
});

const ExperienceItemSchema = z.object({
  title: withDefault(z.string().nullish().describe("Title of the position"), ""),
  employment_type: withDefault(z.string().nullish().describe("Type of employment"), ""),
  location: withDefault(z.string().nullish().describe("Location of the position"), ""),
  description: withDefault(z.string().nullish().describe("Description of the position"), ""),
  location_type: withDefault(z.string().nullish().describe("Type of location"), ""),
  start_date: withDefault(z.string().nullish().describe("Start date of the position"), ""),
  end_date: withDefault(z.string().nullish().describe("End date of the position"), ""),
  is_currently_working: z.boolean().describe("Is currently working"),
});

const InterestItemSchema = z.object({
  name: withDefault(z.string().nullish(), ""),
});

const ProfileItemSchema = z.object({
  network: withDefault(z.string().nullish(), ""),
  url: withDefault(z.string().nullish(), ""),
});

const ProjectItemSchema = z.object({
  name: withDefault(z.string().nullish(), ""),
  description: withDefault(z.string().nullish(), ""),
});

const SkillItemSchema = z.object({
  name: withDefault(z.string().nullish().describe("The name of the skill"), ""),
  level: withDefault(z.number().nullish().describe("The proficiency level of the skill"), 0),
});

export const ResumeSchema = z.object({
  basics: withDefault(BasicsSchema.describe("Basic information about the individual"), {}),
  summary: withDefault(z.string().nullish().describe("A brief summary about the individual"), ""),
  awards: withDefault(AwardItemSchema.array().default([]).describe("Awards received by the individual"), []),
  certifications: withDefault(
    CertificationItemSchema.array().default([]).describe("Certifications obtained by the individual"),
    []
  ),
  education: withDefault(
    EducationItemSchema.array().default([]).describe("Educational background of the individual"),
    []
  ),
  experience: withDefault(
    ExperienceItemSchema.array().default([]).describe("Work experience of the individual"),
    []
  ),
  interests: withDefault(InterestItemSchema.array().default([]).describe("Interests of the individual"), []),
  profiles: withDefault(
    ProfileItemSchema.array().default([]).describe("Online profiles of the individual"),
    []
  ),
  projects: withDefault(
    ProjectItemSchema.array().default([]).describe("Projects undertaken by the individual"),
    []
  ),
  skills: withDefault(SkillItemSchema.array().default([]).describe("Skills possessed by the individual"), []),
});

// parameter
const CriterionSchema = z.object({
  criteria_name: withDefault(z.string().describe("The name of the evaluation criterion"), ""),
  importance: withDefault(
    z.number().min(0).max(100).describe("The importance score (0-100) of this criterion"), // Default to middle value if parsing fails
    50
  ),
  parameters: withDefault(
    z.array(z.string()).describe("List of specific parameters to evaluate within this criterion"),
    []
  ),
});

// Define the schema for the entire criteria set
export const CriteriaSetSchema = z.object({
  criteria: withDefault(z.array(CriterionSchema).describe("List of all evaluation criteria"), []),
});

const EvaluationParameterSchema = z.object({
  parameterName: withDefault(z.string().describe("Name of the parameter"), ""),
  score: withDefault(z.number().describe("Score of the parameter"), 0),
});

const EvaluationCriterionSchema = z.object({
  criterionName: withDefault(z.string().describe("Name of the criterion"), ""),
  parameters: withDefault(EvaluationParameterSchema.array().describe("Parameters for the criterion"), []),
  justification: withDefault(z.string().describe("justification for the evalution of the criteria"), "None"),
});

export const EvaluationSchema = z.object({
  evaluation: withDefault(EvaluationCriterionSchema.array().describe("Evaluation results"), []),
});

function withDefault<T>(schema: z.ZodType<T>, defaultValue: T) {
  return schema.catch(defaultValue) as z.ZodType<T>;
}
