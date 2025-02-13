import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from 'src/authentication/decorators/user.decrator';
import { Permissions } from 'src/authorization/decorators/permissions.decorator';
import { UserEntity } from './entities/user.entity';
import { RoleService } from 'src/role/role.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post()
  @Permissions('create:users')
  async create(
    @User() user: UserEntity,
    @Body() { roleId, ...dto }: CreateUserDto,
  ) {
    const role = await this.roleService.findOneByUser(user.id, roleId);
    return this.userService.create({
      ...dto,
      role,
      createdBy: user,
    });
  }

  @Get()
  @Permissions('read:users')
  findAll(@User('id') createdBy: string) {
    return this.userService.findAllByCreatedBy(createdBy);
  }

  @Get('me')
  findMe(@User() user) {
    return user;
  }

  @Get(':user')
  @Permissions('read:users')
  async findOne(@User('id') createdBy: string, @Param('user') id: string) {
    const user = await this.userService.findOneByCreatedBy(createdBy, id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch(':user')
  @Permissions('update:users')
  async update(
    @User('id') createdBy: string,
    @Param('user') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.findOne(createdBy, id);
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':user')
  @Permissions('delete:users')
  async remove(@User('id') createdBy: string, @Param('user') id: string) {
    await this.findOne(createdBy, id);
    return this.userService.remove(id);
  }
}
