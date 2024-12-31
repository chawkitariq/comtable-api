import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentDto } from './create-document.dto';
import { UpdateDocumentArticleDto } from './update-document-article.dto';

export class UpdateDocumentDto extends PartialType(
  OmitType(CreateDocumentDto, ['articles']),
) {
  @IsDefined()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentArticleDto)
  articles?: UpdateDocumentArticleDto[];
}
