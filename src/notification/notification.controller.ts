import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':notificationId')
  findOne(@Param('notificationId') notificationId: string) {
    return this.notificationService.findOne(notificationId);
  }

  @Patch(':notificationId')
  update(
    @Param('notificationId') notificationId: string,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(notificationId, dto);
  }

  @Delete(':notificationId')
  remove(@Param('notificationId') notificationId: string) {
    return this.notificationService.remove(notificationId);
  }
}
