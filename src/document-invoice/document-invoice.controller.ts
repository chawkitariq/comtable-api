import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { DocumentService } from 'src/document/document.service';
import { CreateDocumentInvoiceDto } from './dtos/create-document-invoice.dto';
import { UpdateDocumentInvoiceDto } from './dtos/update-document-invoice.dto';
import { DocumentTypeEnum } from 'src/document/document.type';

@Controller()
export class DocumentInvoiceController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:companyId/invoices')
  async create(
    @Param('companyId') companyId: string,
    @Body() createDocumentDto: CreateDocumentInvoiceDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.documentService.create({
      ...createDocumentDto,
      type: DocumentTypeEnum.Invoice,
      company,
    });
  }

  @Get('/companies/:companyId/invoices')
  findAll(@Param('companyId') companyId: string) {
    return this.documentService.findAll(companyId);
  }

  @Get('/invoices/:invoiceId')
  findOne(@Param('invoiceId') invoiceId: string) {
    return this.documentService.findOne(invoiceId);
  }

  @Patch('/invoices/:invoiceId')
  update(
    @Param('invoiceId') invoiceId: string,
    @Body() updateDocumentDto: UpdateDocumentInvoiceDto,
  ) {
    return this.documentService.update(invoiceId, updateDocumentDto);
  }

  @Delete('/invoices/:invoiceId')
  remove(@Param('invoiceId') invoiceId: string) {
    return this.documentService.remove(invoiceId);
  }
}
