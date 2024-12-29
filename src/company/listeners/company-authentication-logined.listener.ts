import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import AuthenticationLoginedEvent from 'src/authentication/events/logined.event';
import { CompanyService } from '../company.service';

@Injectable()
export class CompanyAuthenticationLoginedListener {
  constructor(private readonly companyService: CompanyService) {}

  @OnEvent(AuthenticationLoginedEvent.name)
  async handleUserCreatedEvent(event: AuthenticationLoginedEvent) {
    await this.companyService.disableByUser(event.userId);
  }
}
