import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateRecruiterDto } from 'src/recruiter/dto/create-recruiter.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { Response } from 'express';
import { CONSTANTS } from 'src/common/constants';
import { RecruiterService } from 'src/recruiter/recruiter.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateRecruiterDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  async signin(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, recruiterDetails } =
      await this.authService.signIn(authDto);

    // Set access token cookie
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + CONSTANTS.COOKIE_EXPIRE),
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + CONSTANTS.COOKIE_EXPIRE * 15), // longer expiration for refresh token
      })
      .json({ recruiterDetails })
      .send();
    return;
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: any) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refresh(@Req() req: any) {
    const userId = req.user['sub']; //TODO: loose typing
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    const userId = req.user['sub'];
    const recruiterDetails = await this.authService.getMe(userId);

    return {
      ...recruiterDetails,
    };
  }
}
