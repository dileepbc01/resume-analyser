import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { RecruiterModule } from "src/recruiter/recruiter.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";

@Module({
  imports: [JwtModule.register({}), RecruiterModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
