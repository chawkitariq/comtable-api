import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { ContactEntity } from 'src/contact/entities/contact.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Type } from 'class-transformer';
import { DocumentStatusEnum, DocumentTypeEnum } from '../document.type';
import { CreateDocumentArticleDto } from 'src/document-article/dtos/create-document-article.dto';

export class CreateDocumentDto {
  @IsOptional()
  number: string;

  @IsOptional()
  @IsEnum(DocumentTypeEnum)
  type: DocumentTypeEnum;

  @IsOptional()
  @IsEnum(DocumentStatusEnum)
  status: DocumentStatusEnum;

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
  documentArticles?: CreateDocumentArticleDto[];

  company?: CompanyEntity;
  contact?: ContactEntity;
  category?: CategoryEntity;
  createdBy?: UserEntity;
}
