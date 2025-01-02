import { IsDefined, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaxTypeEnum } from '../tax.type';

export class CreateTaxDto {
  @IsDefined()
  name: string;

  @IsOptional()
  @IsNumber()
  rate: number;

  @IsDefined()
  @IsEnum(TaxTypeEnum)
  type: TaxTypeEnum;

  company?: CompanyEntity;
  createdBy?: UserEntity;
}
