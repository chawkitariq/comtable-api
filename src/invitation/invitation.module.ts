import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationEntity } from './entities/invitation.entity';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InvitationCreatedEventListener } from './listeners/invitation-created.listener';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitationEntity]),
    EventEmitterModule.forRoot(),
    UserModule,
    RoleModule,
    NotificationModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService, InvitationCreatedEventListener],
})
export class InvitationModule {}
