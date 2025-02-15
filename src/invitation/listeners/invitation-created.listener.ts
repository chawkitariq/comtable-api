import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import InvitationCreatedEvent from '../events/invitation-created.event';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class InvitationCreatedEventListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent(InvitationCreatedEvent.name)
  async handle({ invitation }: InvitationCreatedEvent) {
    const { sender, recipient } = invitation;

    await this.notificationService.create({
      subject: "Demande D'invitation",
      message: `${sender.email} vous invite`,
      recipient,
      sender,
    });
  }
}
