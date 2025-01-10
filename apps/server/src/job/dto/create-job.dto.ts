import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
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
  @IsOptional()
  type: JobType;

  @ApiPropertyOptional({ description: 'Location of the job' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiPropertyOptional({ description: 'Company offering the job' })
  @IsString()
  @IsOptional()
  company: string;

  @ApiPropertyOptional({ description: 'Description of the job' })
  @IsString()
  @IsOptional()
  description: string;
}
