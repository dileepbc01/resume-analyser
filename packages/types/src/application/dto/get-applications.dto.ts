import { IsString } from "class-validator";

export class GetApplicationsDto {
  @IsString()
  job_id: string;
}
