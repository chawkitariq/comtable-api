import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryTypeEnum } from '../category.type';

export class CreateCategoryDto {
  @IsDefined()
  name: string;

  @IsOptional()
  slug?: string;

  @IsDefined()
  @IsEnum(CategoryTypeEnum)
  type: string;

  @IsOptional()
  color?: string;

  company?: CompanyEntity;
  createdBy?: UserEntity;
}
