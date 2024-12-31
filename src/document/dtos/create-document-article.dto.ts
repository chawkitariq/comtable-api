import { Article } from 'src/article/entities/article.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Document } from '../entities/document.entity';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentArticleTaxDto } from './create-document-article-tax.dto';

export class CreateDocumentArticleDto {
  @IsOptional()
  name: string;

  @IsOptional()
  type: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  price: number;

  @IsOptional()
  tax: number;

  @IsOptional()
  total: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentArticleTaxDto)
  taxes?: CreateDocumentArticleTaxDto[];

  company?: CompanyEntity;
  document?: Document;
  article?: Article;
  createdBy?: UserEntity;
}
