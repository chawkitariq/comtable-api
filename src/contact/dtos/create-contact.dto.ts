import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ContactTypeEnum } from '../contact.type';

export class CreateContactDto {
  @IsDefined()
  name: string;

  @IsDefined()
  @IsEnum(ContactTypeEnum)
  type: ContactTypeEnum;

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
