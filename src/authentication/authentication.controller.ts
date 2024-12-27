import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthenticationGuard } from './guards/local.guard';
import { User } from './decorators/user.decrator';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';
import AuthenticationRegisterDto from './dtos/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() dto: AuthenticationRegisterDto) {
    const isExists = await this.userService.userRepository.existsBy({
      email: dto.email,
    });

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    return this.authenticationService.register(dto);
  }

  @Public()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@User() user) {
    return this.authenticationService.login(user);
  }
}
