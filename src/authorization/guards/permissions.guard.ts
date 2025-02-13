import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSIONS_KEY,
  Permissions,
} from '../decorators/permissions.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<
      Parameters<typeof Permissions>
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!permissions?.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: UserEntity }>();

    const userPermissions = user.role.permissions.map(({ name }) => name);

    return permissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
