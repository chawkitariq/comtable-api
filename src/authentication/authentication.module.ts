import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthenticationStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthenticationStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthenticationGuard } from './guards/jwt.guard';
import { AuthenticationController } from './authentication.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: process.env.AUTH_SECRET_EXPIRE_IN,
      },
    }),
  ],
  providers: [
    AuthenticationService,
    LocalAuthenticationStrategy,
    JwtAuthenticationStrategy,
    JwtAuthenticationGuard,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthenticationGuard,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
