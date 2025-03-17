import { PartialType } from "@nestjs/mapped-types";

import { CreateJobDto } from "./create-job.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

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
