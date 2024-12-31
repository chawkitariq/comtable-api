import { PartialType } from '@nestjs/swagger';
import { CreateDocumentInvoiceDto } from './create-document-invoice.dto';

export class UpdateDocumentInvoiceDto extends PartialType(
  CreateDocumentInvoiceDto,
) {}
