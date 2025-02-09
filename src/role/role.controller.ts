import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@User() user, @Body() dto: CreateRoleDto) {
    const isExists = await this.roleService.isExistsByUserAndName(
      user.id,
      dto.name,
    );

    if (isExists) {
      throw new ConflictException('Role already exists');
    }

    return this.roleService.create({
      ...dto,
      createdBy: user,
    });
  }

  @Get()
  findAll(@User('id') userId: string) {
    return this.roleService.findAllByUser(userId);
  }

  @Get(':role')
  async findOne(@User('id') userId: string, @Param('role') id: string) {
    const role = await this.roleService.findOneByUser(userId, id);

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
    await this.findOne(userId, id);
    await this.roleService.remove(id);
  }
}
