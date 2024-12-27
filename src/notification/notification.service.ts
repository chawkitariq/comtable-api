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
    public readonly notificationRepository: Repository<Notification>,
  ) {}

  create(dto: CreateNotificationDto) {
    return this.notificationRepository.save(dto);
  }

  findAll() {
    return this.notificationRepository.find();
  }

  findOne(id: string) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, dto);
  }

  remove(id: string) {
    return this.notificationRepository.delete(id);
  }
}
