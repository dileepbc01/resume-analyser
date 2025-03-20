import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetApplicationsDto {
  @IsString()
  job_id: string;

  @IsString()
  @IsOptional()
  search_by:"Name"|"Location"|"Role";

  @IsString()
  @IsOptional()
  search_term:string;

  @IsString()
  @IsOptional()
  sort_by:"Name"|"Experience"|"Resume Score";

  @IsString()
  @IsOptional()
  sort_order:"Asc"|"Desc";  

  @IsNumber()
  page_number:number;
}
