import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InitDataValidationService } from './services/init-data-validation.service';
import { JwtTokenService } from './services/jwt-token.service';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, InitDataValidationService, JwtTokenService],
  exports: [AuthService, JwtTokenService],
})
export class AuthModule {}
