import { IsDefined, IsEmail, IsStrongPassword, IsUUID } from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;

  @IsDefined()
  @IsUUID('4')
  roleId?: string;

  role?: RoleEntity;
  createdBy?: UserEntity;
}
