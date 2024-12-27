import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import ms from 'ms';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && compare(plainPassword, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };

    const expiresIn = ms(process.env.AUTH_SECRET_EXPIRE_IN) / 1000;

    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload, { expiresIn }),
      expires_in: expiresIn,
    };
  }
}
