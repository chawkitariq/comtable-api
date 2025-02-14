import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { InvitationEntity } from './entities/invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import InvitationCreatedEvent from './events/invitation-created.event';

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
      new InvitationCreatedEvent(invitation.id),
    );

    return invitation;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, dto: Omit<UpdateInvitationDto, 'roleId'>) {
    return this.repository.save({ id, ...dto });
  }

  remove(id: string) {
    return this.repository.delete({ id });
  }
}
