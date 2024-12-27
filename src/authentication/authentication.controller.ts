import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from './guards/local.guard';
import { User } from './decorators/user.decrator';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@User() user) {
    return this.authenticationService.login(user);
  }
}
