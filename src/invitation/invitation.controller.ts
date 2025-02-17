import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/authentication/decorators/user.decrator';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';

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

  @Post(':invitationId/cancel')
  async cancel(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: number,
  ) {
    const isExists = await this.invitationService.isOneExistsBySender(
      invitationId,
      user.id,
    );

    if (!isExists) {
      throw new NotFoundException('Invitation not found');
    }

    const isPending = await this.invitationService.isOnePending(invitationId);

    if (!isPending) {
      throw new BadRequestException('Invitation not pending');
    }

    return this.invitationService.cancel(invitationId);
  }

  @Post(':invitationId/accept')
  async accept(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: number,
  ) {
    const isExists = await this.invitationService.isOneExistsByReceiver(
      invitationId,
      user.id,
    );

    if (!isExists) {
      throw new NotFoundException('Invitation not found');
    }

    const isPending = await this.invitationService.isOnePending(invitationId);

    if (!isPending) {
      throw new BadRequestException('Invitation not pending');
    }

    return this.invitationService.accept(invitationId);
  }

  @Post(':invitationId/reject')
  async reject(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: number,
  ) {
    const isExists = await this.invitationService.isOneExistsByReceiver(
      invitationId,
      user.id,
    );

    if (!isExists) {
      throw new NotFoundException('Invitation not found');
    }

    const isPending = await this.invitationService.isOnePending(invitationId);

    if (!isPending) {
      throw new BadRequestException('Invitation not pending');
    }

    return this.invitationService.reject(invitationId);
  }

  @Get()
  findAll(@User() receiver: UserEntity) {
    if (!receiver.isAdmin) {
      return this.invitationService.findAllBySenderOrReceiver(receiver.id);
    }

    return this.invitationService.findAll();
  }

  @Get('sended')
  findAllSended(@User('id') senderId: string) {
    return this.invitationService.findAllBySender(senderId);
  }

  @Get('received')
  findAllReceived(@User('id') receiverId: string) {
    return this.invitationService.findAllByReceiver(receiverId);
  }

  @Get(':invitationId')
  async findOne(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: number,
  ) {
    if (!user.isAdmin) {
      const isExistsBySender = await this.invitationService.isOneExistsBySender(
        invitationId,
        user.id,
      );

      const isExistsByReceiver =
        await this.invitationService.isOneExistsByReceiver(
          invitationId,
          user.id,
        );

      if (!isExistsBySender && !isExistsByReceiver) {
        throw new NotFoundException('Invitation not found');
      }
    }

    const invitation = await this.invitationService.findOne(invitationId);

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    return invitation;
  }

  @Patch(':invitationId')
  async update(
    @User() sender: UserEntity,
    @Param('invitationId') invitationId: number,
    @Body() { roleId, ...dto }: UpdateInvitationDto,
  ) {
    const isExists = await this.invitationService.isOneExistsBySender(
      invitationId,
      sender.id,
    );

    if (!isExists) {
      throw new NotFoundException('Invitation not found');
    }

    let role: RoleEntity | undefined;

    if (roleId === null) {
      role = null;
    } else {
      role = await this.roleService.findOne(roleId);
    }

    dto.role = role;

    return this.invitationService.update(invitationId, dto);
  }

  @Delete(':invitationId')
  async remove(
    @User() sender: UserEntity,
    @Param('invitationId') invitationId: number,
  ) {
    const isExists = await this.invitationService.isOneExistsBySender(
      invitationId,
      sender.id,
    );

    if (!isExists) {
      throw new NotFoundException('Invitation not found');
    }

    await this.invitationService.remove(invitationId);
  }
}
