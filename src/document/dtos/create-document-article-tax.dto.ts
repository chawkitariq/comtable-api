import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Document } from '../entities/document.entity';
import { IsOptional } from 'class-validator';
import { DocumentArticle } from '../entities/document-article.entity';

export class CreateDocumentArticleTaxDto {
  @IsOptional()
  name: string;

  @IsOptional()
  type: string;

  @IsOptional()
  amount: number;

  company?: CompanyEntity;
  document?: Document;
  tax?: Document;
  documentArticle?: DocumentArticle;
  createdBy?: UserEntity;
}
