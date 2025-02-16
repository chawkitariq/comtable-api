import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsISO8601,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreatePermissionDto } from 'src/permission/dtos/create-permission.dto';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { InvitationStatusEnum } from '../invitation.type';

export class CreateInvitationDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsISO8601()
  expiredAt?: Date;

  @IsOptional()
  @IsUUID('4', { always: false })
  roleId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions?: CreatePermissionDto[];

  status?: InvitationStatusEnum;
  recipient: UserEntity;
  role?: RoleEntity;
  sender: UserEntity;
}
