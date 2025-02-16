import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { User } from 'src/authentication/decorators/user.decrator';
import { ReadNotificationDto } from './dtos/read-notification.dto';
import { DeleteNotificationDto } from './dtos/delete-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('read')
  readAll(
    @User('id') receiverId: string,
    @Query() { ids: notificationIds }: ReadNotificationDto,
  ) {
    return this.notificationService.readAllByReceiver(
      notificationIds,
      receiverId,
    );
  }

  @Get()
  findAll(@User('id') receiverId: string) {
    return this.notificationService.findAllByReceiver(receiverId);
  }

  @Get(':notificationId')
  findOne(
    @User('id') receiverId: string,
    @Param('notificationId') notificationId: string,
  ) {
    return this.notificationService.findOneByReceiver(
      notificationId,
      receiverId,
    );
  }

  @Delete()
  async removeAll(
    @User('id') receiverId: string,
    @Query() { ids: notificationIds }: DeleteNotificationDto,
  ) {
    await this.notificationService.removeAllByReceiver(
      notificationIds,
      receiverId,
    );
  }
}
