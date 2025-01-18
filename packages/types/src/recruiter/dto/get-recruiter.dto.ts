import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetRecruiterDto {
  @ApiProperty({ description: "The unique identifier of the recruiter" })
  @IsString()
  id: string;
}
