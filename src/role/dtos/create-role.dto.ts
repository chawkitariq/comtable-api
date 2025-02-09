import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePermissionDto } from 'src/permission/dtos/create-permission.dto';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateRoleDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions?: CreatePermissionDto[];

  createdBy: UserEntity;
}
