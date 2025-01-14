import { z } from "zod";

export type JobType = "full-time" | "part-time" | "contract" | "internship" | "temporary";
export interface BaseJobDto {
  role: string;
  type: JobType;
  location: string;
  company: string;
  description: string;
  scoringWeights: {
    technical_competence: number;
    proffessional_experience_impact: number;
    education: number;
    leadership_soft_skills: number;
    role_alignment_cultural_fit: number
  }
}

export const createjobSchema = z.object({
  role: z.string().min(1, "Role is required"),
  type: z.enum(["full-time", "part-time", "contract", "internship", "temporary"], {
    required_error: "Job type is required",
  }),
  location: z.string().optional(),
  company: z.string().optional(),
  description: z.string().optional(),
});

export type CreateJobDto = z.infer<typeof createjobSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateJobDto extends Partial<CreateJobDto> {
  // All fields are optional for updates
}

export interface JobResponse extends Required<BaseJobDto> {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobRoutes {
  "/job": {
    post: {
      requestBody: CreateJobDto;
      responses: JobResponse;
    };
    get: {
      responses: JobResponse[];
    };
  };
  "/job/:id": {
    get: {
      responses: JobResponse;
    };
    patch: {
      requestBody: UpdateJobDto;
      responses: JobResponse;
    };
  };
}
