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

  @Post('/companies/:companyId/bills')
  async create(
    @Param('companyId') companyId: string,
    @Body() createDocumentDto: CreateDocumentBillDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.documentService.create({
      ...createDocumentDto,
      type: 'bill',
      company,
    });
  }

  @Get('/companies/:companyId/bills')
  findAll(@Param('companyId') companyId: string) {
    return this.documentService.findAllByCompany(companyId);
  }

  @Get('/bills/:billId')
  findOne(@Param('billId') billId: string) {
    return this.documentService.findOne(billId);
  }

  @Patch('/bills/:billId')
  update(
    @Param('billId') billId: string,
    @Body() updateDocumentDto: UpdateDocumentBillDto,
  ) {
    return this.documentService.update(billId, updateDocumentDto);
  }

  @Delete('/bills/:billId')
  remove(@Param('billId') billId: string) {
    return this.documentService.remove(billId);
  }
}
