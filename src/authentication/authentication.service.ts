import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import ms from 'ms';
import AuthenticationRegisterDto from './dtos/register.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import AuthenticationRegisteredEvent from './events/registered.event';
import AuthenticationLoginedEvent from './events/logined.event';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && compare(plainPassword, user.password)) {
      return user;
    }

    return null;
  }

  async register({
    email,
    password: plainPassword,
  }: AuthenticationRegisterDto) {
    const hashedPassword = await hash(plainPassword, 10);

    const user = await this.userService.create({
      email,
      password: hashedPassword,
    });

    this.eventEmitter.emit(
      AuthenticationRegisteredEvent.name,
      new AuthenticationRegisteredEvent(user.id),
    );

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id };

    const expiresIn = ms(process.env.AUTH_SECRET_EXPIRE_IN) / 1000;
    const expiredAt = Math.floor(Date.now() / 1000) + expiresIn;

    this.eventEmitter.emit(
      AuthenticationLoginedEvent.name,
      new AuthenticationLoginedEvent(user.id),
    );

    return {
      tokenType: 'Bearer',
      accessToken: this.jwtService.sign(payload),
      tokenExpiredAt: expiredAt,
    };
  }
}
