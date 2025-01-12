import { IsArray, IsDefined, IsUUID } from 'class-validator';

export class RemoveManyDocumentArticleTaxDto {
  @IsDefined()
  @IsArray()
  @IsUUID('4', { each: true })
  documentArticleTaxIds: string[];
}
