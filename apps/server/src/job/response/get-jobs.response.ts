import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Job } from "schema/job.schema";

import { JobType } from "../dto/create-job.dto";

export class GetJobResponse {
  @IsString()
  @ApiProperty({ description: "Job document id" })
  id: string;

  @ApiProperty({ description: "Role of the job" })
  @IsString()
  role: string;

  @ApiPropertyOptional({ enum: JobType, description: "Type of the job" })
  @IsString()
  type: JobType;

  @ApiPropertyOptional({ description: "Location of the job" })
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: "Company offering the job" })
  @IsString()
  company: string;

  @ApiPropertyOptional({ description: "Description of the job" })
  @IsString()
  description: string;

  @ApiProperty({ description: "Job creation timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Job update timestamp" })
  updatedAt: Date;

  static fromEntity(job: Job): GetJobResponse {
    const dto = new GetJobResponse();
    dto.id = job._id.toString();
    dto.company = job.company;
    dto.description = job.description;
    dto.role = job.role;
    dto.location = job.location;
    dto.type = job.type;
    dto.createdAt = job.created_at;
    dto.updatedAt = job.updated_at;
    return dto;
  }
}
