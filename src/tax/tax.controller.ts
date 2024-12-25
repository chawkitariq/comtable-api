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
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Controller('taxes')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxService.create(createTaxDto);
  }

  @Get()
  findAll() {
    return this.taxService.findAll();
  }

  @Get(':tax')
  findOne(@Param('tax') id: string) {
    return this.taxService.findOne(+id);
  }

  @Patch(':tax')
  update(@Param('tax') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxService.update(+id, updateTaxDto);
  }

  @Delete(':tax')
  remove(@Param('tax') id: string) {
    return this.taxService.remove(+id);
  }
}
