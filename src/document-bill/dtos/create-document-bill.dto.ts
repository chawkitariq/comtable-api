import { OmitType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from 'src/document/dtos/create-document.dto';

export class CreateDocumentBillDto extends OmitType(CreateDocumentDto, [
  'type',
]) {}
