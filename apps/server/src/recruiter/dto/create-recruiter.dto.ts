import { IsEmail, IsString } from 'class-validator';

export class CreateRecruiterDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  refresh_token: string | null;
}
