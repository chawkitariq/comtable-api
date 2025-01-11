import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { TaxTypeEnum } from 'src/tax/tax.type';
import { DocumentArticleEntity } from 'src/document-article/entities/document-article.entity';
import { DocumentEntity } from 'src/document/entities/document.entity';

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
