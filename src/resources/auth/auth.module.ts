import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from 'src/common/jwt/jwt.config';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
