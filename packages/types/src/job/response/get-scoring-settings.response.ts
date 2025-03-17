import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from "class-validator";
import { ScoringCriteria } from "src/schema";

class Criteria {
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

export class GetScoringSettingsResponse {
  @ApiProperty({ description: "Name of the criteria" })
  @IsArray()
  criterias: Criteria[];

  @ApiProperty({ description: "Name of the criteria" })
  @IsString()
  scoring_instructions: string;

  @ApiProperty({ description: "Name of the criteria" })
  @IsString()
  job_id: string;

  static fromEntity(jobScoringSettings: ScoringCriteria): GetScoringSettingsResponse {
    const dto = new GetScoringSettingsResponse();
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
