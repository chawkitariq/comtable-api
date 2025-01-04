import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { ArticleTypeEnum } from '../article.type';

export class CreateArticleDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsEnum(ArticleTypeEnum)
  type: ArticleTypeEnum;

  @IsOptional()
  salePrice: number;

  @IsOptional()
  purchasePrice: number;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  taxIds?: string[];

  @IsOptional()
  @IsUUID('4')
  categoryId?: string;

  company?: CompanyEntity;
  category?: CategoryEntity;
}
