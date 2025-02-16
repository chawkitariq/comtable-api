import {
  IsArray,
  IsDefined,
  IsUUID,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteNotificationDto {
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  @Transform(({ value }) => value.split(','))
  ids: string[];
}
