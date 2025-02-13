import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import ms from 'ms';
import AuthenticationRegisterDto from './dtos/register.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import AuthenticationRegisteredEvent from './events/registered.event';
import AuthenticationLoggedInEvent from './events/logged-in.event';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPassword = await compare(plainPassword, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
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

  async login(user: UserEntity) {
    const payload = { sub: user.id };

    const expiresIn = ms(process.env.AUTH_SECRET_EXPIRE_IN) / 1000;
    const expiredAt = Math.floor(Date.now() / 1000) + expiresIn;

    this.eventEmitter.emit(
      AuthenticationLoggedInEvent.name,
      new AuthenticationLoggedInEvent(user.id),
    );

    return {
      tokenType: 'Bearer',
      accessToken: this.jwtService.sign(payload),
      expiresIn,
      expiredAt,
      me: user,
    };
  }
}
