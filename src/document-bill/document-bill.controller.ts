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
import { CreateDocumentBillDto } from './dtos/create-document-bill.dto';
import { UpdateDocumentBillDto } from './dtos/update-document-bill.dto';

@Controller()
export class DocumentBillController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:billId/bills')
  async create(
    @Param('billId') billId: string,
    @Body() createDocumentDto: CreateDocumentBillDto,
  ) {
    const company = await this.companyService.findOne(billId);
    return this.documentService.create({
      ...createDocumentDto,
      company,
    });
  }

  @Get('/companies/:billId/bills')
  findAll(@Param('billId') billId: string) {
    return this.documentService.findAllByCompany(billId);
  }

  @Get('/bills/:invoiceId')
  findOne(@Param('invoiceId') invoiceId: string) {
    return this.documentService.findOne(invoiceId);
  }

  @Patch('/bills/:invoiceId')
  update(
    @Param('invoiceId') invoiceId: string,
    @Body() updateDocumentDto: UpdateDocumentBillDto,
  ) {
    return this.documentService.update(invoiceId, updateDocumentDto);
  }

  @Delete('/bills/:invoiceId')
  remove(@Param('invoiceId') invoiceId: string) {
    return this.documentService.remove(invoiceId);
  }
}
