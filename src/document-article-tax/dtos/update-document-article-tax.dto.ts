import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleTaxDto } from './create-document-article-tax.dto';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class UpdateDocumentArticleTaxDto extends PartialType(
  CreateDocumentArticleTaxDto,
) {
  @IsOptional()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsBoolean()
  remove = false;
}
