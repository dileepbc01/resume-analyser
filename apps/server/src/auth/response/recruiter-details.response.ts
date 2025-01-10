import { IsString, IsEmail, IsNotEmpty, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty({ description: 'First name of the recruiter', minLength: 2 })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string;

    @ApiProperty({ description: 'ID of the recruiter' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'Last name of the recruiter', minLength: 2 })
    @IsString()
    @IsNotEmpty() 
    @MinLength(2)
    lastName: string;

    @ApiProperty({ description: 'Email address of the recruiter' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}