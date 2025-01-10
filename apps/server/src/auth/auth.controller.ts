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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateRecruiterDto } from 'src/recruiter/dto/create-recruiter.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { Response } from 'express';
import { CONSTANTS } from 'src/common/constants';
import { RecruiterService } from 'src/recruiter/recruiter.service';
import { AuthResponse } from './response/recruiter-details.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiResponse({ status: 201, type:AuthResponse, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async signup(@Body() createUserDto: CreateRecruiterDto): Promise<AuthResponse> {
    const recruiter= await this.authService.signUp(createUserDto);
    return {
      email: recruiter.recruiterDetails.email,
      firstName: recruiter.recruiterDetails.firstName,
      lastName: recruiter.recruiterDetails.lastName,
      id: recruiter.recruiterDetails.id,
    }
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async signin(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) : Promise<AuthResponse> {
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
     
    return {
      email: recruiterDetails.email,
      firstName: recruiterDetails.firstName,
      lastName: recruiterDetails.lastName,
      id: recruiterDetails.id,
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiResponse({ status: 200, description: 'User successfully logged out.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  logout(@Req() req: any) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  refresh(@Req() req: any) {
    const userId = req.user['sub']; //TODO: loose typing
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  @ApiResponse({ status: 200,type:ApiResponse, description: 'User details retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getMe(@Req() req: any) : Promise<AuthResponse> {
    const userId = req.user['sub'];
    const recruiterDetails = await this.authService.getMe(userId);

    return {
      id:userId,
      ...recruiterDetails,
    };
  }
}
