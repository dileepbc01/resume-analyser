import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AuthDto {
  @ApiProperty({
    example: "user@example.com",
    required: true,
    description: "The email of the user",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password123",
    required: true,
    description: "The password of the user",
  })
  @IsString()
  password: string;
}
