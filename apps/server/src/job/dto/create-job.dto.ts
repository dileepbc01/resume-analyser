import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  TEMPORARY = 'temporary',
}

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEnum(JobType)
  @IsOptional()
  type: JobType;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  description: string;
}
