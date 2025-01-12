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
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { CompanyService } from 'src/company/company.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/authentication/decorators/user.decrator';

@Controller()
export class CurrencyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly currencyService: CurrencyService,
  ) {}

  @Post('/companies/:companyId/currencies')
  async create(
    @User() user: UserEntity,
    @Param('companyId') companyId: string,
    @Body() dto: CreateCurrencyDto,
  ) {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new BadRequestException('Company does not exists');
    }

    return this.currencyService.create({
      ...dto,
      company,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/currencies')
  async findAll(@Param('companyId') companyId: string) {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.currencyService.findAllByCompany(companyId);
  }

  @Get('currencies/:currencyId')
  findOne(@Param('currencyId') currencyId: string) {
    return this.currencyService.findOne(currencyId);
  }

  @Patch('currencies/:currencyId')
  async update(
    @Param('currencyId') currencyId: string,
    @Body() dto: UpdateCurrencyDto,
  ) {
    const { affected } = await this.currencyService.update(currencyId, dto);

    if (!affected) {
      throw new NotFoundException('Currency not found');
    }

    return this.findOne(currencyId);
  }

  @Delete('currencies/:currencyId')
  remove(@Param('currencyId') currencyId: string) {
    return this.currencyService.remove(currencyId);
  }
}
