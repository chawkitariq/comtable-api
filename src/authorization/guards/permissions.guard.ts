import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSIONS_KEY,
  Permissions,
} from '../decorators/permissions.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { PermissionActionEnum } from 'src/permission/permission.type';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const claims = this.reflector.getAllAndOverride<
      Parameters<typeof Permissions>
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!claims) {
      return true;
    }

    const [subject, actions, operation] = claims;

    if (!subject) {
      return true;
    }

    if (!actions?.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: UserEntity }>();

    const permissionsActions = user.role.permissions
      ?.filter((permission) => permission.subject === subject)
      .map(({ action }) => action);

    if (operation === 'every') {
      return actions.every((action) =>
        permissionsActions.includes(action as PermissionActionEnum),
      );
    }

    return actions.some((action) =>
      permissionsActions.includes(action as PermissionActionEnum),
    );
  }
}
