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
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { User } from 'src/authentication/decorators/user.decrator';

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
    return this.companyService.findOne(id);
  }

  @Patch(':company')
  update(
    @Param('company') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Patch(':company/enable')
  async on(@User() user, @Param('company') id: string) {
    await this.disable(user);
    return this.companyService.enable(id);
  }

  @Post('disable')
  async disable(@User() user) {
    await this.companyService.disableByUser(user.id);
  }

  @Delete(':company')
  remove(@Param('company') id: string) {
    return this.companyService.remove(id);
  }
}
