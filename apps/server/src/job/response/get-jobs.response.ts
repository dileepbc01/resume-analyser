import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { JobType } from "../dto/create-job.dto";

export class GetJobResponse {
  @ApiProperty({ description: 'Role of the job' })
  role: string;

  @ApiPropertyOptional({ enum: JobType, description: 'Type of the job' })
  type: JobType;

  @ApiPropertyOptional({ description: 'Location of the job' })
  location: string;

  @ApiPropertyOptional({ description: 'Company offering the job' })
  company: string;

  @ApiPropertyOptional({ description: 'Description of the job' })
  description: string;
}