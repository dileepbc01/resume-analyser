import { ScoringCriteria } from "@repo/types";

export const defaultScoringCriteria: Omit<ScoringCriteria, "job" | "version" | "_id"> = {
  criterias: [
    {
      criteria_name: "Technical Competence",
      parameters: [
        "Technical Skills",
        "Domain Knowledge",
        "Programming Languages",
        "Project Complexity",
        "Problem Solving",
      ],
      order: 1,
      importance: 35,
    },
    {
      criteria_name: "Professional Experience",
      parameters: [
        "Years Experience",
        "Relevant Experience",
        "Project Impact",
        "Project Scope",
        "Career Progression",
      ],
      order: 2,
      importance: 25,
    },
    {
      criteria_name: "Education",
      parameters: [
        "Degree",
        "Relevant Coursework",
        "Certifications",
        "Conference Presentations",
        "Self Learning",
        "Research",
      ],
      order: 3,
      importance: 15,
    },
    {
      criteria_name: "Leadership",
      parameters: [
        "Leadership Roles",
        "Team Collaboration",
        "Conflict Resolution",
        "Mentorship",
        "Interpersonal Skills",
      ],
      order: 4,
      importance: 10,
    },
    {
      criteria_name: "Role Alignment",
      parameters: [
        "Job Requirements",
        "Company Values",
        "Team Dynamics",
        "Work Life Balance",
        "Personal Interests",
      ],
      order: 5,
      importance: 15,
    },
  ],
  scoring_instructions: `Technical Competence :
    Parameters:
        - Technical Skills
        - Domain Knowledge
        - Programming Languages
        - Project Complexity
        - Problem Solving
    Importance : 35
    
Professional Experience:
    Parameters:
        - Years Experience
        - Relevant Experience
        - Project Impact
        - Project Scope
        - Career Progression
    Importance : 25


Education:
    Parameters:
        - Degree
        - Relevant Coursework
        - Certifications
        - Conference Presentations
        - Self Learning
        - Research
    Importance : 15

Leadership:

    Parameters:
        - Leadership Roles
        - Team Collaboration
        - Conflict Resolution
        - Mentorship
        - Interpersonal Skills
    Importance : 10

Role Alignment:
    Parameters:
        - Job Requirements
        - Company Values
        - Team Dynamics
        - Work Life Balance
        - Personal Interests
    Importance : 15`,
};
