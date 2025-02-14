import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateNotificationDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;

  recipient: UserEntity;
  sender: UserEntity;
}
