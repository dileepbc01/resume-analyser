import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { Recruiter } from 'schema/recruiter.schema';
import { LocalAuthGuard } from './guards/local-auth.gaurd';
import { RecruiterService } from 'src/recruiter/recruiter.service';
import { CreateRecruiterDto } from 'src/recruiter/dto/create-recruiter.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private recruiterService: RecruiterService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @CurrentUser() user: Recruiter,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('signup')
  async signup(@Body() createRecruiterDto: CreateRecruiterDto) {
    return await this.recruiterService.create(createRecruiterDto);
  }
}
