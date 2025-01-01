import { IsString } from 'class-validator';

export class CreateRecruiterDto {
  @IsString()
  id: string;
}
