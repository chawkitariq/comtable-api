import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleDto } from './create-document-article.dto';
import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDocumentArticleTaxDto } from 'src/document-article-tax/dtos/update-document-article-tax.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateDocumentArticleDto extends PartialType(
  OmitType(CreateDocumentArticleDto, ['taxes']),
) {
  @IsOptional()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentArticleTaxDto)
  taxes?: UpdateDocumentArticleTaxDto[];
}
