import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
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

  receiver: UserEntity;
}
