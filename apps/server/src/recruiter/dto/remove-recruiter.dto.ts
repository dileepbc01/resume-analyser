import { IsString } from 'class-validator';

export class RemoveRecruiterDto {
  @IsString()
  id: string;
}
