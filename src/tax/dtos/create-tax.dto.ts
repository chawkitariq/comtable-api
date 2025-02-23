import { IsDecimal, IsDefined, IsEnum, IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaxTypeEnum } from '../tax.type';

export class CreateTaxDto {
  @IsDefined()
  name: string;

  @IsOptional()
  @IsDecimal()
  rate: number;

  @IsDefined()
  @IsEnum(TaxTypeEnum)
  type: TaxTypeEnum;

  company?: CompanyEntity;
  createdBy?: UserEntity;
}
