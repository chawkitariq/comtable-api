import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';
import { PermissionActionEnum } from '../permission.type';

export class CreatePermissionDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PermissionActionEnum)
  action: PermissionActionEnum;

  role: RoleEntity;
}
