import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateDocumentArticleDto } from './create-document-article.dto';
import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @IsOptional()
  number: string;

  @IsOptional()
  type: string;

  @IsOptional()
  status: string;

  @IsOptional()
  issuedAt: Date;

  @IsOptional()
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentArticleDto)
  articles?: CreateDocumentArticleDto[];

  company?: CompanyEntity;
  contact?: Contact;
  category?: Category;
  createdBy?: UserEntity;
}
