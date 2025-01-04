import { ArticleEntity } from 'src/article/entities/article.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DocumentEntity } from '../entities/document.entity';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentArticleTaxDto } from './create-document-article-tax.dto';
import { ArticleTypeEnum } from 'src/article/article.type';

export class CreateDocumentArticleDto {
  @IsOptional()
  name: string;

  @IsDefined()
  @IsEnum(ArticleTypeEnum)
  type: ArticleTypeEnum;

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
  document?: DocumentEntity;
  article?: ArticleEntity;
  createdBy?: UserEntity;
}
