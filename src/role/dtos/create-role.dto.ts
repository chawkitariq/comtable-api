import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateRoleDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  createdBy: UserEntity;
}
