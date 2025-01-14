import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RecruiterService } from 'src/recruiter/recruiter.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private recruiterService: RecruiterService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.refresh_token) {
      return req.cookies.refresh_token;
    }
    throw new UnauthorizedException('No refresh token found in cookie 1');
  }
  validate(req: Request, payload: any) {
    if (req.cookies && req.cookies.refresh_token) {
      const refreshToken = req.cookies.refresh_token;
      return { refreshToken, ...payload };
    }
    throw new UnauthorizedException('No refresh token found in cookie 2');
  }
}
