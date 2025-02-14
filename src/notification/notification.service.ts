import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    public readonly repository: Repository<Notification>,
  ) {}

  create(dto: CreateNotificationDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateNotificationDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
