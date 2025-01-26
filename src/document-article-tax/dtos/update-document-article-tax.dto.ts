import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleTaxDto } from './create-document-article-tax.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateDocumentArticleTaxDto extends PartialType(
  CreateDocumentArticleTaxDto,
) {
  @IsOptional()
  @IsUUID('4')
  id: string;
}
