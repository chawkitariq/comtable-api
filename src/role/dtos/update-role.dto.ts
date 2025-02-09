import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePermissionDto } from 'src/permission/dtos/update-permission.dto';

export class UpdateRoleDto extends PartialType(
  OmitType(CreateRoleDto, ['permissions']),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePermissionDto)
  permissions?: UpdatePermissionDto[];
}
