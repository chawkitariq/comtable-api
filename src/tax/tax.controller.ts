import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  async create(
    @User() user,
    @Param('companyId') companyId: string,
    @Body() createTaxDto: CreateTaxDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.taxService.create({
      ...createTaxDto,
      company,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/taxes')
  findAll(@Param('companyId') companyId: string) {
    return this.taxService.findAll(companyId);
  }

  @Get('taxes/:tax')
  findOne(@Param('taxId') taxId: string) {
    return this.taxService.findOne(taxId);
  }

  @Patch('taxes/:taxId')
  update(@Param('taxId') taxId: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxService.update(taxId, updateTaxDto);
  }

  @Delete('taxes/:taxId')
  remove(@Param('taxId') taxId: string) {
    return this.taxService.remove(taxId);
  }
}
