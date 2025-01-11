import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleTaxDto } from './create-document-article-tax.dto';
import { IsDefined, IsUUID } from 'class-validator';

export class UpdateDocumentArticleTaxDto extends PartialType(
  CreateDocumentArticleTaxDto,
) {
  @IsDefined()
  @IsUUID('4')
  id: string;
}
