import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import InvitationCreatedEvent from '../events/invitation-created.event';
import { InvitationService } from '../invitation.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class InvitationCreatedEventListener {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly notificationService: NotificationService,
  ) {}

  @OnEvent(InvitationCreatedEvent.name)
  async handle({ invitationId }: InvitationCreatedEvent) {
    const { sender, recipient } =
      await this.invitationService.findOne(invitationId);

    await this.notificationService.create({
      subject: "Demande D'invitation",
      message: `${sender.email} vous invite`,
      recipient,
      sender,
    });
  }
}
