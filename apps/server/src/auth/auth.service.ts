import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CONSTANTS } from "src/common/constants";
import { CreateRecruiterDto } from "src/recruiter/dto/create-recruiter.dto";
import { RecruiterService } from "src/recruiter/recruiter.service";

import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private recruiterService: RecruiterService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateRecruiterDto) {
    // Check if user exists
    const recruiterExist = await this.recruiterService.findByEmail(createUserDto.email);

    if (recruiterExist) {
      throw new BadRequestException("User already exists");
    }

    // Hash password
    const newRecruiter = await this.recruiterService.create({
      ...createUserDto,
    });
    const tokens = await this.getTokens(String(newRecruiter._id), newRecruiter.email);
    await this.updateRefreshToken(String(newRecruiter._id), tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      recruiterDetails: {
        id: String(newRecruiter._id),
        firstName: newRecruiter.first_name,
        lastName: newRecruiter.last_name,
        email: newRecruiter.email,
      },
    };
  }

  async login(data: AuthDto) {
    const recruiter = await this.recruiterService.findByEmail(data.email);
    if (!recruiter) throw new BadRequestException("User does not exist");
    const passwordMatches = await bcrypt.compare(data.password, recruiter.password);
    if (!passwordMatches) throw new BadRequestException("Password is incorrect");
    const tokens = await this.getTokens(String(recruiter._id), recruiter.email);
    await this.updateRefreshToken(String(recruiter._id), tokens.refreshToken);
    const recruiterDetails = {
      id: String(recruiter._id),
      firstName: recruiter.first_name,
      lastName: recruiter.last_name,
      email: recruiter.email,
    };
    return { ...tokens, recruiterDetails };
  }

  async getMe(recruiterId: string) {
    const recruiter = await this.recruiterService.findByRecruiterId(recruiterId);
    if (!recruiter) throw new BadRequestException("User does not exist");
    const recruiterDetails = {
      // TODO: create proper type for this

      firstName: recruiter.first_name,
      lastName: recruiter.last_name,
      email: recruiter.email,
    };
    return recruiterDetails;
  }

  async logout(userId: string) {
    await this.recruiterService.update(userId, { refresh_token: null });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.recruiterService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const recruiter = await this.recruiterService.findByRecruiterId(userId);
    if (!recruiter || !recruiter.refresh_token) throw new ForbiddenException("Access Denied");
    const refreshTokenMatches = await bcrypt.compare(refreshToken, recruiter.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens(recruiter.id, recruiter.email);
    await this.updateRefreshToken(recruiter.id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: CONSTANTS.ACCESS_TOKEN_EXPIRATION,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: CONSTANTS.REFRESH_TOKEN_EXPIRATION,
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
