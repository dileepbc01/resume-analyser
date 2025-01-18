import { IsString } from "class-validator";

export class GetJobDto {
  @IsString()
  id: string;
}
