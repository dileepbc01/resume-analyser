import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";
import { ScoringCriteria } from "src/schema";

export class GetScoringSettingsResponse {
  @ApiProperty({ description: "Name of the criteria" })
  @IsString()
  criteria_name: string;

  @ApiProperty({ description: "Importance of the criteria" })
  @IsNumber()
  importance: number;

  @ApiProperty({ description: "Order of the criteria" })
  @IsNumber()
  order: number;

  @ApiProperty({ description: "Parameters for the criteria" })
  @IsString()
  parameters: string[];

  @ApiProperty({ description: "Job ID" })
  @IsString()
  job: string;

  static fromEntity(jobScoringSettings: ScoringCriteria): GetScoringSettingsResponse {
    const dto = new GetScoringSettingsResponse();
    dto.criteria_name = jobScoringSettings.criteria_name;
    dto.importance = jobScoringSettings.importance;
    dto.order = jobScoringSettings.order;
    dto.parameters = jobScoringSettings.parameters;
    dto.job = jobScoringSettings.job.toString();
    return dto;
  }
}
