import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
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
    @Body() dto: CreateDocumentDto,
  ) {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new BadRequestException('Company does not exists');
    }

    return this.documentService.create({
      ...dto,
      company,
    });
  }

  @Get('/companies/:companyId/documents')
  async findAll(@Param('companyId') companyId: string) {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.documentService.findAll(companyId);
  }

  @Get('/documents/:documentId')
  findOne(@Param('documentId') documentId: string) {
    return this.documentService.findOne(documentId);
  }

  @Patch('/documents/:documentId')
  update(
    @Param('documentId') documentId: string,
    @Body() dto: UpdateDocumentDto,
  ) {
    return this.documentService.update(documentId, dto);
  }

  @Delete('/documents/:documentId')
  remove(@Param('documentId') documentId: string) {
    return this.documentService.remove(documentId);
  }
}
