import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDocumentInvoiceDto } from './dtos/create-document-invoice.dto';
import { UpdateDocumentInvoiceDto } from './dtos/update-document-invoice.dto';
import { DocumentTypeEnum } from 'src/document/document.type';
import { DocumentController } from 'src/document/document.controller';
import { User } from 'src/authentication/decorators/user.decrator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller()
export class DocumentInvoiceController {
  constructor(private readonly documentController: DocumentController) {}

  @Post('/companies/:companyId/invoices')
  async create(
    @User() user: UserEntity,
    @Param('companyId') companyId: string,
    @Body() createDocumentDto: CreateDocumentInvoiceDto,
  ) {
    return this.documentController.create(companyId, {
      ...createDocumentDto,
      type: DocumentTypeEnum.Invoice,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/invoices')
  findAll(@Param('companyId') companyId: string) {
    return this.documentController.findAll(companyId);
  }

  @Get('/invoices/:invoiceId')
  findOne(@Param('invoiceId') invoiceId: string) {
    return this.documentController.findOne(invoiceId);
  }

  @Patch('/invoices/:invoiceId')
  update(
    @Param('invoiceId') invoiceId: string,
    @Body() updateDocumentDto: UpdateDocumentInvoiceDto,
  ) {
    return this.documentController.update(invoiceId, updateDocumentDto);
  }

  @Delete('/invoices/:invoiceId')
  remove(@Param('invoiceId') invoiceId: string) {
    return this.documentController.remove(invoiceId);
  }
}
