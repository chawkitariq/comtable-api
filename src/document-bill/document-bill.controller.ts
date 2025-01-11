import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDocumentBillDto } from './dtos/create-document-bill.dto';
import { UpdateDocumentBillDto } from './dtos/update-document-bill.dto';
import { DocumentTypeEnum } from 'src/document/document.type';
import { DocumentController } from 'src/document/document.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller()
export class DocumentBillController {
  constructor(private readonly documentController: DocumentController) {}

  @Post('/companies/:companyId/bills')
  async create(
    @User() user: UserEntity,
    @Param('companyId') companyId: string,
    @Body() createDocumentDto: CreateDocumentBillDto,
  ) {
    return this.documentController.create(companyId, {
      ...createDocumentDto,
      type: DocumentTypeEnum.Bill,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/bills')
  findAll(@Param('companyId') companyId: string) {
    return this.documentController.findAll(companyId);
  }

  @Get('/bills/:billId')
  findOne(@Param('billId') billId: string) {
    return this.documentController.findOne(billId);
  }

  @Patch('/bills/:billId')
  update(
    @Param('billId') billId: string,
    @Body() updateDocumentDto: UpdateDocumentBillDto,
  ) {
    return this.documentController.update(billId, updateDocumentDto);
  }

  @Delete('/bills/:billId')
  remove(@Param('billId') billId: string) {
    return this.documentController.remove(billId);
  }
}
