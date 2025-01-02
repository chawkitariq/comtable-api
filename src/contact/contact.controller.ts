import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos/create-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller()
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:companyId/contacts')
  async create(
    @User() user,
    @Param('companyId') companyId: string,
    @Body() createContactDto: CreateContactDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.contactService.create({
      ...createContactDto,
      createdBy: user,
      company,
    });
  }

  @Get('/companies/:companyId/contacts')
  findAll(@Param('companyId') companyId: string) {
    return this.contactService.findAll(companyId);
  }

  @Get('/contacts/:contactId')
  findOne(@Param('contactId') contactId: string) {
    return this.contactService.findOne(contactId);
  }

  @Patch('/contacts/:contactId')
  update(
    @Param('contactId') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(contactId, updateContactDto);
  }

  @Delete('/contacts/:contactId')
  remove(@Param('contactId') contactId: string) {
    return this.contactService.remove(contactId);
  }
}
