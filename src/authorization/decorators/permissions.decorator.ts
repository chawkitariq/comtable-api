import { SetMetadata } from '@nestjs/common';
import { PermissionActionEnum } from 'src/permission/permission.type';

export type PermissionsOperationType = 'every' | 'oneof';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (
  subject: string,
  actions: `${PermissionActionEnum}`[],
  operation: PermissionsOperationType = 'every',
) => SetMetadata(PERMISSIONS_KEY, [subject, actions, operation]);
