import { IsArray, IsDefined, IsUUID } from 'class-validator';

export class RemoveManyDocumentArticleDto {
  @IsDefined()
  @IsArray()
  @IsUUID('4', { each: true })
  documentArticleIds: string[];
}
