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
  findAll(@User() user: UserEntity) {
    if (!user.isAdmin) {
      return this.invitationService.findAllBySenderOrRecipient(user.id);
    }

    return this.invitationService.findAll();
  }

  @Get(':invitationId')
  async findOne(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: string,
  ) {
    if (!user.isAdmin) {
      const isExistsBySender = await this.invitationService.isOneExistsBySender(
        invitationId,
        user.id,
      );

      const isExistsByRecipient =
        await this.invitationService.isOneExistsByRecipient(
          invitationId,
          user.id,
        );

      if (!isExistsBySender && !isExistsByRecipient) {
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
    @Param('invitationId') invitationId: string,
    @Body() dto: UpdateInvitationDto,
  ) {
    const senderId = !sender.isAdmin ? sender.id : undefined;

    const { affected } = await this.invitationService.updateBySender(
      invitationId,
      dto,
      senderId,
    );

    if (!affected) {
      throw new NotFoundException('Invitation not found');
    }
  }

  @Patch(':invitationId/cancel')
  async cancel(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: string,
  ) {
    if (!user.isAdmin) {
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
    }

    return this.invitationService.cancel(invitationId);
  }

  @Patch(':invitationId/accept')
  async accept(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: string,
  ) {
    if (!user.isAdmin) {
      const isExists = await this.invitationService.isOneExistsByRecipient(
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
    }

    return this.invitationService.accept(invitationId);
  }

  @Patch(':invitationId/reject')
  async reject(
    @User() user: UserEntity,
    @Param('invitationId') invitationId: string,
  ) {
    if (!user.isAdmin) {
      const isExists = await this.invitationService.isOneExistsByRecipient(
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
    }

    return this.invitationService.reject(invitationId);
  }

  @Delete(':invitationId')
  async remove(
    @User() sender: UserEntity,
    @Param('invitationId') invitationId: string,
  ) {
    const senderId = !sender.isAdmin ? sender.id : undefined;

    const { affected } = await this.invitationService.removeBySender(
      invitationId,
      senderId,
    );

    if (!affected) {
      throw new NotFoundException('Invitation not found');
    }
  }
}
