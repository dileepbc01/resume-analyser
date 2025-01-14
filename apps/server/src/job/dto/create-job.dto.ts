import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  TEMPORARY = 'temporary',
}

export class CreateJobDto {
  @ApiProperty({ description: 'Role of the job' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiPropertyOptional({ enum: JobType, description: 'Type of the job' })
  @IsEnum(JobType)
  type: JobType;

  @ApiPropertyOptional({ description: 'Location of the job' })
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: 'Company offering the job' })
  @IsString()
  company: string;

  @ApiPropertyOptional({ description: 'Description of the job' })
  @IsString()
  @MinLength(100)
  description: string;
}
