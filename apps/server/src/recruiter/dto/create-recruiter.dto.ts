import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecruiterDto {
  @ApiProperty({ description: 'First name of the recruiter' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name of the recruiter' })
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Email address of the recruiter' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the recruiter account' })
  @IsString()
  password: string;
}
