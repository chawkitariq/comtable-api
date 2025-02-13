import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';

export class CreatePermissionDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  role: RoleEntity;
}
