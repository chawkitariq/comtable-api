import {
  IsDefined,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateDocumentDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  number: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsDefined()
  issuedAt: Date;

  @IsDefined()
  dueAt: Date;

  @IsOptional()
  currencyCode: string;

  @IsOptional()
  currencyRate: number;

  @IsOptional()
  contactName: string;

  @IsOptional()
  contactEmail?: string;

  @IsOptional()
  contactPhone?: string;

  @IsOptional()
  contactAddress?: string;

  @IsOptional()
  contactCity?: string;

  @IsOptional()
  contactPostalCode?: string;

  @IsOptional()
  contactState?: string;

  @IsOptional()
  contactCountry?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  footer?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  subTitle?: string;

  @IsOptional()
  template?: string;

  @IsOptional()
  color?: string;

  company?: CompanyEntity;
  contact?: Contact;
  category?: Category;
  createdBy?: UserEntity;
}
