import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { TaxTypeEnum } from 'src/tax/tax.type';
import { DocumentArticleEntity } from 'src/document-article/entities/document-article.entity';
import { DocumentEntity } from 'src/document/entities/document.entity';
import { Type } from 'class-transformer';

export class CreateDocumentArticleTaxDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(TaxTypeEnum)
  type: TaxTypeEnum;

  @IsOptional()
  amount: number;

  company?: CompanyEntity;
  document?: DocumentEntity;
  tax?: DocumentEntity;
  documentArticle?: DocumentArticleEntity;
  createdBy?: UserEntity;
}

export class CreateManyDocumentArticleTaxDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentArticleTaxDto)
  documentArticleTaxes?: CreateDocumentArticleTaxDto[];
}
