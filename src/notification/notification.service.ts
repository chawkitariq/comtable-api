import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { NotificationEntity } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    public readonly repository: Repository<NotificationEntity>,
  ) {}

  create(dto: CreateNotificationDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findAllByReceiver(receiverId: string) {
    return this.repository.findBy({ receiver: { id: receiverId } });
  }

  findOne(notificationId: string) {
    return this.repository.findOneBy({ id: notificationId });
  }

  findOneByReceiver(notificationId: string, receiverId: string) {
    return this.repository.findOneBy({
      id: notificationId,
      receiver: { id: receiverId },
    });
  }

  update(notificationId: string, dto: UpdateNotificationDto) {
    return this.repository.update(notificationId, dto);
  }

  readAllByReceiver(notificationIds: string[], receiverId: string) {
    return this.repository.manager.transaction(async (manager) => {
      await manager.update(
        NotificationEntity,
        {
          id: In(notificationIds),
          readAt: IsNull(),
          // receiver: { id: receiverId },
        },
        { readAt: new Date() },
      );
      return manager.findBy(NotificationEntity, { id: In(notificationIds) });
    });
  }

  remove(notificationId: string) {
    return this.repository.delete(notificationId);
  }

  async removeAllByReceiver(notificationIds: string[], receiverId: string) {
    return this.repository.delete({
      id: In(notificationIds),
      // receiver: { id: receiverId },
    });
  }
}
