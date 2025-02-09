import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';

export class CreatePermissionDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsOptional()
  @IsBoolean()
  create: boolean;

  @IsOptional()
  @IsBoolean()
  read: boolean;

  @IsOptional()
  @IsBoolean()
  update: boolean;

  @IsOptional()
  @IsBoolean()
  delete: boolean;

  role: RoleEntity;
}
