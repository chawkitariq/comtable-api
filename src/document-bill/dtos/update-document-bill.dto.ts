import { PartialType } from '@nestjs/swagger';
import { CreateDocumentBillDto } from './create-document-bill.dto';

export class UpdateDocumentBillDto extends PartialType(CreateDocumentBillDto) {}
