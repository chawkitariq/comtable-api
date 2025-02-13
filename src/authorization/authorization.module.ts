import { Module } from '@nestjs/common';
import { PermissionsGuard } from './guards/permissions.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    PermissionsGuard,
    // {
    //   provide: APP_GUARD,
    //   useExisting: PermissionsGuard,
    // },
  ],
})
export class AuthorizationModule {}
