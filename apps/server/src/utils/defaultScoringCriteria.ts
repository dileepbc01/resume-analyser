import { ScoringCriteria } from "@repo/types";

export const defaultScoringCriteria: Omit<ScoringCriteria, "job">[] = [
  {
    criteria_name: "Technical Competence",
    importance: 30,
    order: 0,
    parameters: [
      "Technical skills and tool proficiency",
      "Domain knowledge and certifications",
      "Programming languages and frameworks",
      "Project complexity and technical achievements",
      "Problem-solving examples",
    ],
  },
  {
    criteria_name: "Professional Experience & Impact",
    importance: 25,
    order: 1,
    parameters: [
      "Years of experience",
      "Relevant experience",
      "Impact on previous projects",
      "Project scope and complexity",
      "Career progression and promotions",
    ],
  },
  {
    criteria_name: "Education and Continuous Learning",
    importance: 20,
    order: 2,
    parameters: [
      "Relevant coursework",
      "Professional certifications",
      "Industry contributions",
      "Open source participation",
      "Conference presentations",
      "Self-learning initiatives",
      "Research experience",
    ],
  },
  {
    criteria_name: "Leadership & Soft Skills",
    importance: 15,
    order: 3,
    parameters: [
      "Leadership roles and responsibilities",
      "Team collaboration and communication",
      "Conflict resolution and problem-solving",
      "Mentorship and coaching",
      "Teamwork and interpersonal skills",
    ],
  },
  {
    criteria_name: "Role Alignment & Cultural Fit",
    importance: 10,
    order: 4,
    parameters: [
      "Alignment with job requirements",
      "Company values and culture",
      "Team dynamics and collaboration",
      "Work-life balance and flexibility",
      "Personal interests and motivations",
    ],
  },
];
