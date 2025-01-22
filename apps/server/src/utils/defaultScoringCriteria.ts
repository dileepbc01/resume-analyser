import { ScoringCriteria } from "@repo/types";
import { z } from "zod";

enum TechnicalCompetenceEnum {
  technical_skills = "Technical skills and tool proficiency",
  domain_knowledge = "Domain knowledge and certifications",
  programming_languages = "Programming languages and frameworks",
  project_complexity = "Project complexity and technical achievements",
  problem_solving = "Problem-solving examples",
}

enum ProfessionalExperienceEnum {
  years_experience = "Years of experience",
  relevant_experience = "Relevant experience",
  project_impact = "Impact on previous projects",
  project_scope = "Project scope and complexity",
  career_progression = "Career progression and promotions",
}

enum EducationEnum {
  relevant_coursework = "Relevant coursework",
  certifications = "Professional certifications",
  industry_contributions = "Industry contributions",
  open_source = "Open source participation",
  conference_presentations = "Conference presentations",
  self_learning = "Self-learning initiatives",
  research = "Research experience",
}

enum LeadershipEnum {
  leadership_roles = "Leadership roles and responsibilities",
  team_collaboration = "Team collaboration and communication",
  conflict_resolution = "Conflict resolution and problem-solving",
  mentorship = "Mentorship and coaching",
  interpersonal_skills = "Teamwork and interpersonal skills",
}

enum RoleAlignmentEnum {
  job_requirements = "Alignment with job requirements",
  company_values = "Company values and culture",
  team_dynamics = "Team dynamics and collaboration",
  work_life_balance = "Work-life balance and flexibility",
  personal_interests = "Personal interests and motivations",
}

export const defaultScoringCriteria: (Omit<ScoringCriteria, "job"> & { schema: z.AnyZodObject })[] = [
  {
    criteria_name: "Technical Competence",
    importance: 30,
    order: 0,
    parameters: Object.values(TechnicalCompetenceEnum),
    schema: z.object({
      [TechnicalCompetenceEnum.technical_skills]: z.number().nullish().default(0),
      [TechnicalCompetenceEnum.domain_knowledge]: z.number().nullish().default(0),
      [TechnicalCompetenceEnum.programming_languages]: z.number().nullish().default(0),
      [TechnicalCompetenceEnum.project_complexity]: z.number().nullish().default(0),
      [TechnicalCompetenceEnum.problem_solving]: z.number().nullish().default(0),
    }),
  },
  {
    criteria_name: "Professional Experience & Impact",
    importance: 25,
    order: 1,
    parameters: Object.values(ProfessionalExperienceEnum),
    schema: z.object({
      [ProfessionalExperienceEnum.years_experience]: z.number().nullish().default(0),
      [ProfessionalExperienceEnum.relevant_experience]: z.number().nullish().default(0),
      [ProfessionalExperienceEnum.project_impact]: z.number().nullish().default(0),
      [ProfessionalExperienceEnum.project_scope]: z.number().nullish().default(0),
      [ProfessionalExperienceEnum.career_progression]: z.number().nullish().default(0),
    }),
  },
  {
    criteria_name: "Education and Continuous Learning",
    importance: 20,
    order: 2,
    parameters: Object.values(EducationEnum),
    schema: z.object({
      [EducationEnum.relevant_coursework]: z.number().nullish().default(0),
      [EducationEnum.certifications]: z.number().nullish().default(0),
      [EducationEnum.industry_contributions]: z.number().nullish().default(0),
      [EducationEnum.open_source]: z.number().nullish().default(0),
      [EducationEnum.conference_presentations]: z.number().nullish().default(0),
      [EducationEnum.self_learning]: z.number().nullish().default(0),
      [EducationEnum.research]: z.number().nullish().default(0),
    }),
  },
  {
    criteria_name: "Leadership & Soft Skills",
    importance: 15,
    order: 3,
    parameters: Object.values(LeadershipEnum),
    schema: z.object({
      [LeadershipEnum.leadership_roles]: z.number().nullish().default(0),
      [LeadershipEnum.team_collaboration]: z.number().nullish().default(0),
      [LeadershipEnum.conflict_resolution]: z.number().nullish().default(0),
      [LeadershipEnum.mentorship]: z.number().nullish().default(0),
      [LeadershipEnum.interpersonal_skills]: z.number().nullish().default(0),
    }),
  },
  {
    criteria_name: "Role Alignment & Cultural Fit",
    importance: 10,
    order: 4,
    parameters: Object.values(RoleAlignmentEnum),
    schema: z.object({
      [RoleAlignmentEnum.job_requirements]: z.number().nullish().default(0),
      [RoleAlignmentEnum.company_values]: z.number().nullish().default(0),
      [RoleAlignmentEnum.team_dynamics]: z.number().nullish().default(0),
      [RoleAlignmentEnum.work_life_balance]: z.number().nullish().default(0),
      [RoleAlignmentEnum.personal_interests]: z.number().nullish().default(0),
    }),
  },
];
