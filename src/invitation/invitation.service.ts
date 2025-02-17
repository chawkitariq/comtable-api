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

  findAllBySender(senderId: string) {
    return this.repository.findBy({ sender: { id: senderId } });
  }

  findAllByReceiver(receiverId: string) {
    return this.repository.findBy({ receiver: { id: receiverId } });
  }

  findAllBySenderOrReceiver(userId: string) {
    return this.repository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.role', 'role')
      .leftJoinAndSelect('i.sender', 'sender')
      .leftJoinAndSelect('i.receiver', 'receiver')
      .orWhere('i.sender.id = :id', { id: userId })
      .orWhere('i.receiver.id = :id', { id: userId })
      .getMany();
  }

  findOne(invitationId: number) {
    return this.repository.findOneBy({ id: invitationId });
  }

  isOneExistsByReceiver(invitationId: number, receiverId: string) {
    return this.repository.existsBy({
      id: invitationId,
      receiver: { id: receiverId },
    });
  }

  isOneExistsBySender(invitationId: number, senderId: string) {
    return this.repository.existsBy({
      id: invitationId,
      sender: { id: senderId },
    });
  }

  isOnePending(invitationId: number) {
    return this.repository.existsBy({
      id: invitationId,
      status: InvitationStatusEnum.Pending,
    });
  }

  update(invitationId: number, dto: Omit<UpdateInvitationDto, 'roleId'>) {
    return this.repository.manager.transaction(async (manager) => {
      await manager.save(InvitationEntity, { id: invitationId, ...dto });
      return manager.findOneBy(InvitationEntity, { id: invitationId });
    });
  }

  cancel(invitationId: number) {
    return this.repository.save({
      id: invitationId,
      status: InvitationStatusEnum.Canceled,
    });
  }

  accept(invitationId: number) {
    return this.repository.save({
      id: invitationId,
      status: InvitationStatusEnum.Accepted,
    });
  }

  reject(invitationId: number) {
    return this.repository.save({
      id: invitationId,
      status: InvitationStatusEnum.Rejected,
    });
  }

  remove(invitationId: number) {
    return this.repository.softDelete({ id: invitationId });
  }
}
