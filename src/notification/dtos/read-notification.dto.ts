import {
  IsArray,
  IsDefined,
  IsUUID,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ReadNotificationDto {
  @IsDefined()
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @Transform(({ value }) => value.split(','))
  ids: string[];
}
