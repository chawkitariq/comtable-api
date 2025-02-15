import { InvitationEntity } from '../entities/invitation.entity';

export default class InvitationCreatedEvent {
  constructor(public readonly invitation: InvitationEntity) {}
}
