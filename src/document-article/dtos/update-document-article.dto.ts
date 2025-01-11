import { PartialType } from '@nestjs/swagger';
import { CreateDocumentArticleDto } from './create-document-article.dto';
import { IsArray, IsDefined, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDocumentArticleDto extends PartialType(
  CreateDocumentArticleDto,
) {
  @IsDefined()
  @IsUUID('4')
  id: string;
}

export class UpdateManyDocumentArticleDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentArticleDto)
  documentArticles: UpdateDocumentArticleDto[];
}
