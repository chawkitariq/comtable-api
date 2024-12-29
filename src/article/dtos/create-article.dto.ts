import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';

export class CreateArticleDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsIn(['product', 'service'])
  type: string;

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
  category?: Category;
}
