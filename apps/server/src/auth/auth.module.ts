import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RecruiterModule } from 'src/recruiter/recruiter.module';

@Module({
  imports: [JwtModule.register({}), RecruiterModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
