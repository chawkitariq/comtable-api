import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { CompanyService } from 'src/company/company.service';

@Controller()
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:companyId/documents')
  async create(
    @Param('companyId') companyId: string,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.documentService.create({
      ...createDocumentDto,
      company,
    });
  }

  @Get('/companies/:companyId/documents')
  findAll(@Param('companyId') companyId: string) {
    return this.documentService.findAll(companyId);
  }

  @Get('/documents/:documentId')
  findOne(@Param('documentId') documentId: string) {
    return this.documentService.findOne(documentId);
  }

  @Patch('/documents/:documentId')
  update(
    @Param('documentId') documentId: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(documentId, updateDocumentDto);
  }

  @Delete('/documents/:documentId')
  remove(@Param('documentId') documentId: string) {
    return this.documentService.remove(documentId);
  }
}
