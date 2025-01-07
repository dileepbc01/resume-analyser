import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { RecruiterService } from 'src/recruiter/recruiter.service';
import { CreateRecruiterDto } from 'src/recruiter/dto/create-recruiter.dto';

@Injectable()
export class AuthService {
  constructor(
    private recruiterService: RecruiterService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateRecruiterDto): Promise<any> {
    // Check if user exists

    const recruiterExist = await this.recruiterService.findByEmail(
      createUserDto.email,
    );

    if (recruiterExist) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const newRecruiter = await this.recruiterService.create({
      ...createUserDto,
    });
    const tokens = await this.getTokens(
      String(newRecruiter._id),
      newRecruiter.email,
    );
    await this.updateRefreshToken(
      String(newRecruiter._id),
      tokens.refreshToken,
    );
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const recruiter = await this.recruiterService.findByEmail(data.email);
    if (!recruiter) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(
      data.password,
      recruiter.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(String(recruiter._id), recruiter.email);
    await this.updateRefreshToken(String(recruiter._id), tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.recruiterService.update(userId, { refresh_token: null });
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

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
