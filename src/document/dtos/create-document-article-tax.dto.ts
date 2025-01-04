import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DocumentEntity } from '../entities/document.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { DocumentArticleEntity } from '../entities/document-article.entity';
import { TaxTypeEnum } from 'src/tax/tax.type';

export class CreateDocumentArticleTaxDto {
  @IsOptional()
  name: string;

  @IsOptional()
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
