import { Module } from '@nestjs/common';
import { DocumentInvoiceController } from './document-invoice.controller';
import { CompanyModule } from 'src/company/company.module';
import { DocumentModule } from 'src/document/document.module';

@Module({
  imports: [CompanyModule, DocumentModule],
  controllers: [DocumentInvoiceController],
})
export class DocumentInvoiceModule {}
