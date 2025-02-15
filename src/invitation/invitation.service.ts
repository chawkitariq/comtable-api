import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { InvitationEntity } from './entities/invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import InvitationCreatedEvent from './events/invitation-created.event';
import { InvitationStatusEnum } from './invitation.type';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    public readonly repository: Repository<InvitationEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: Omit<CreateInvitationDto, 'roleId'>) {
    const invitation = await this.repository.save(dto);

    this.eventEmitter.emit(
      InvitationCreatedEvent.name,
      new InvitationCreatedEvent(invitation),
    );

    return invitation;
  }

  findAll() {
    return this.repository.find();
  }

  findAllBySenderOrRecipient(userId: string) {
    return this.repository
      .createQueryBuilder('i')
      .orWhere('i.sender.id = :id', { id: userId })
      .orWhere('i.recipient.id = :id', { id: userId })
      .getMany();
  }

  findOne(invitationId: string) {
    return this.repository.findOneBy({ id: invitationId });
  }

  isOneExistsByRecipient(invitationId: string, recipientId: string) {
    return this.repository.existsBy({
      id: invitationId,
      recipient: { id: recipientId },
    });
  }

  isOneExistsBySender(invitationId: string, senderId: string) {
    return this.repository.existsBy({
      id: invitationId,
      sender: { id: senderId },
    });
  }

  isOnePending(invitationId: string) {
    return this.repository.existsBy({
      id: invitationId,
      status: InvitationStatusEnum.Pending,
    });
  }

  update(invitationId: string, dto: Omit<UpdateInvitationDto, 'roleId'>) {
    return this.repository.update(invitationId, dto);
  }

  updateBySender(
    invitationId: string,
    dto: Omit<UpdateInvitationDto, 'roleId'>,
    senderId?: string,
  ) {
    return this.repository.update(
      { id: invitationId, ...(senderId && { sender: { id: senderId } }) },
      dto,
    );
  }

  cancel(invitationId: string) {
    return this.repository.save({
      id: invitationId,
      status: InvitationStatusEnum.Canceled,
    });
  }

  accept(invitationId: string) {
    return this.repository.save({
      id: invitationId,
      status: InvitationStatusEnum.Accepted,
    });
  }

  reject(invitationId: string) {
    return this.repository.save({
      id: invitationId,
      status: InvitationStatusEnum.Rejected,
    });
  }

  remove(invitationId: string) {
    return this.repository.delete({ id: invitationId });
  }

  removeBySender(invitationId: string, senderId?: string) {
    return this.repository.delete({
      id: invitationId,
      ...(senderId && { sender: { id: senderId } }),
    });
  }
}
