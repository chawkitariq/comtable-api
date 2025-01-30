import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentDto } from './create-document.dto';
import { UpdateDocumentArticleDto } from 'src/document-article/dtos/update-document-article.dto';

export class UpdateDocumentDto extends PartialType(
  OmitType(CreateDocumentDto, ['documentArticles']),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentArticleDto)
  documentArticles?: UpdateDocumentArticleDto[];
}
