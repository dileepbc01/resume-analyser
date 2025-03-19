import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from "class-validator";
import { JobScoringCriteria } from "../dto";
import { ScoringCriteria } from "../../schema";

export class GetScoringSettingsResponse {
  @ApiProperty({ description: "Name of the criteria" })
  @IsArray()
  criterias: JobScoringCriteria[];

  @ApiProperty({ description: "Name of the criteria" })
  @IsString()
  scoring_instructions: string;

  @ApiPropertyOptional({ description: "Version of the scoring settings" })
  @IsNumber()
  version: number;

  static fromEntity(jobScoringSettings: ScoringCriteria): GetScoringSettingsResponse {
    const dto = new GetScoringSettingsResponse();
    dto.version = jobScoringSettings.version;
    dto.criterias = jobScoringSettings.criterias.map((criteria) => ({
      criteriaName: criteria.criteria_name,
      importance: criteria.importance,
      order: criteria.order,

      parameters: criteria.parameters,
    }));

    dto.scoring_instructions = jobScoringSettings.scoring_instructions;

    return dto;
  }
}
