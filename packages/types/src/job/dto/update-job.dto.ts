import { PartialType } from "@nestjs/mapped-types";

import { CreateJobDto } from "./create-job.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsObject, IsArray } from "class-validator";

export class UpdateJobDto extends PartialType(CreateJobDto) {}

export class CreateScoringPromptDto {
  @ApiProperty({ description: "The scoring prompt string" })
  @IsString()
  @IsNotEmpty()
  scoringPrompt: string;
}

export class UpdateScoringPromptDto {
  @ApiProperty({ description: "The scoring prompt string" })
  @IsString()
  @IsNotEmpty()
  scoringPrompt: string;
}

export class JobScoringCriteria {
  @ApiProperty({ description: "Name of the criteria" })
  @IsString()
  criteriaName: string;

  @ApiProperty({ description: "Importance of the criteria" })
  @IsNumber()
  importance: number;

  @ApiProperty({ description: "Order of the criteria" })
  @IsNumber()
  order: number;

  @ApiProperty({ description: "Parameters for the criteria" })
  @IsString()
  parameters: string[];
}

export class UpdateScoringSliderDto {
  @ApiProperty({ description: "The scoring slider string" })
  @IsArray()
  @IsNotEmpty()
  criterias: Pick<JobScoringCriteria, "criteriaName" | "importance">[];
}
