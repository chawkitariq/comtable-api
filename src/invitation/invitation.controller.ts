import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller('invitations')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post()
  async create(
    @User() sender,
    @Body() { roleId, ...dto }: CreateInvitationDto,
  ) {
    const recipient = await this.userService.findOneByEmail(dto.email);
    const role = await this.roleService.findOne(roleId);

    return this.invitationService.create({
      ...dto,
      recipient,
      role,
      sender,
    });
  }

  @Get()
  findAll() {
    return this.invitationService.findAll();
  }

  @Get(':invitationId')
  findOne(@Param('invitationId') invitationId: string) {
    return this.invitationService.findOne(invitationId);
  }

  @Patch(':invitationId')
  update(
    @Param('invitationId') invitationId: string,
    @Body() dto: UpdateInvitationDto,
  ) {
    return this.invitationService.update(invitationId, dto);
  }

  @Delete(':invitationId')
  remove(@Param('invitationId') invitationId: string) {
    return this.invitationService.remove(invitationId);
  }
}
