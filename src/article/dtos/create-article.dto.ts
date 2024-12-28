import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';

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
  @IsBoolean()
  disabled = false;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  taxIds?: string[];

  @IsOptional()
  @IsUUID('4')
  categoryId?: string;

  company?: Company;
  category?: Category;
}
