import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  findMe(@User() user) {
    return user;
  }

  @Get(':user')
  findOne(@Param('user') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':user')
  update(@Param('user') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':user')
  remove(@Param('user') id: string) {
    return this.userService.remove(id);
  }
}
