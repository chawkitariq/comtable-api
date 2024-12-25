import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':company')
  findOne(@Param('company') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':company')
  update(
    @Param('company') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':company')
  remove(@Param('company') id: string) {
    return this.companyService.remove(+id);
  }
}
