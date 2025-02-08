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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@User() user, @Body() dto: CreateRoleDto) {
    return this.roleService.create({
      ...dto,
      createdBy: user,
    });
  }

  @Get()
  findAll(@User('id') userId: string) {
    return this.roleService.findAll(userId);
  }

  @Get(':role')
  async findOne(@User('id') userId: string, @Param('role') id: string) {
    const role = await this.roleService.findOne(userId, id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  @Patch(':role')
  async update(
    @User('id') userId: string,
    @Param('role') id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    await this.findOne(userId, id);
    return this.roleService.update(id, dto);
  }

  @Delete(':role')
  async remove(@User('id') userId: string, @Param('role') id: string) {
    const { affected } = await this.roleService.remove(userId, id);

    if (!affected) {
      throw new NotFoundException('Role not found');
    }
  }
}
