import { IsDefined, IsIn, IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateContactDto {
  @IsDefined()
  name: string;

  @IsDefined()
  @IsIn(['customer', 'vendor'])
  type: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  taxNumber?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  postalCode?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  website?: string;

  @IsOptional()
  currencyCode?: string;

  company?: CompanyEntity;
  createdBy?: UserEntity;
}
