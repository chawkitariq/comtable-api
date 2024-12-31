import { Module } from '@nestjs/common';
import { DocumentBillController } from './document-bill.controller';
import { CompanyModule } from 'src/company/company.module';
import { DocumentModule } from 'src/document/document.module';

@Module({
  imports: [CompanyModule, DocumentModule],
  controllers: [DocumentBillController],
})
export class DocumentBillModule {}
