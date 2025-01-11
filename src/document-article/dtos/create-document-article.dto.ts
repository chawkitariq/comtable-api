import { ArticleEntity } from 'src/article/entities/article.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleTypeEnum } from 'src/article/article.type';
import { DocumentEntity } from 'src/document/entities/document.entity';

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

  company?: CompanyEntity;
  document?: DocumentEntity;
  article?: ArticleEntity;
  createdBy?: UserEntity;
}

export class CreateManyDocumentArticleDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentArticleDto)
  documentArticles: CreateDocumentArticleDto[];
}
