import { SetMetadata } from '@nestjs/common';
import { PermissionActionType } from 'src/permission/permission.type';

export type PermissionsOperationType = 'every' | 'oneof';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (
  subject: string,
  actions: PermissionActionType[],
  operation: PermissionsOperationType = 'every',
) => SetMetadata(PERMISSIONS_KEY, [subject, actions, operation]);
