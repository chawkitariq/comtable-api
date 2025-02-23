import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dtos/create-tax.dto';
import { UpdateTaxDto } from './dtos/update-tax.dto';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller()
export class TaxController {
  constructor(
    private readonly taxService: TaxService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:companyId/taxes')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @User() user,
    @Param('companyId') companyId: string,
    @Body() dto: CreateTaxDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.taxService.create({
      ...dto,
      company,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/taxes')
  findAll(@Param('companyId') companyId: string) {
    return this.taxService.findAllByCompany(companyId);
  }

  @Get('taxes/:taxId')
  findOne(@Param('taxId') taxId: string) {
    return this.taxService.findOne(taxId);
  }

  @Patch('taxes/:taxId')
  async update(@Param('taxId') taxId: string, @Body() dto: UpdateTaxDto) {
    await this.taxService.update(taxId, dto);
    return this.taxService.findOne(taxId);
  }

  @Delete('taxes/:taxId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('taxId') taxId: string) {
    await this.taxService.remove(taxId);
  }
}
