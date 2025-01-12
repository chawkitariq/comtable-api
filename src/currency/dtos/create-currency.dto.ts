import {
  IsDecimal,
  IsDefined,
  IsEnum,
  IsISO4217CurrencyCode,
  IsOptional,
} from 'class-validator';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrencySymbolPositionEnum } from '../currency.type';

export class CreateCurrencyDto {
  @IsDefined()
  name: string;

  @IsDefined()
  @IsISO4217CurrencyCode()
  code: string;

  @IsOptional()
  symbol?: string;

  @IsOptional()
  @IsDecimal()
  rate: number;

  @IsOptional()
  precision?: string;

  @IsOptional()
  @IsEnum(CurrencySymbolPositionEnum)
  symbolPosition: CurrencySymbolPositionEnum;

  @IsOptional()
  decimalMark?: string;

  @IsOptional()
  thousandsSeparator?: string;

  company?: CompanyEntity;
  createdBy?: UserEntity;
}
