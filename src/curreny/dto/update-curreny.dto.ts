import { PartialType } from '@nestjs/swagger';
import { CreateCurrenyDto } from './create-curreny.dto';

export class UpdateCurrenyDto extends PartialType(CreateCurrenyDto) {}
