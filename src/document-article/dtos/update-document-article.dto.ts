import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleDto } from './create-document-article.dto';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDocumentArticleTaxDto } from 'src/document-article-tax/dtos/update-document-article-tax.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateDocumentArticleDto extends PartialType(
  OmitType(CreateDocumentArticleDto, ['documentArticleTaxes']),
) {
  @IsOptional()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsBoolean()
  remove = false;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentArticleTaxDto)
  documentArticleTaxes?: UpdateDocumentArticleTaxDto[];
}
