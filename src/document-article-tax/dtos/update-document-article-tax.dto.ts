import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleTaxDto } from './create-document-article-tax.dto';
import { IsArray, IsDefined, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDocumentArticleTaxDto extends PartialType(
  CreateDocumentArticleTaxDto,
) {
  @IsDefined()
  @IsUUID('4')
  id: string;
}

export class UpdateManyDocumentArticleTaxDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentArticleTaxDto)
  documentArticleTaxes?: UpdateDocumentArticleTaxDto[];
}
