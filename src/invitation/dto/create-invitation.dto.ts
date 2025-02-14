import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsISO8601,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreatePermissionDto } from 'src/permission/dtos/create-permission.dto';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateInvitationDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsISO8601()
  expiredAt?: Date;

  @IsOptional()
  // @IsInt()
  // @Min(0)
  roleId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions?: CreatePermissionDto[];

  user: UserEntity;
  role?: RoleEntity;
  sender: UserEntity;
}
