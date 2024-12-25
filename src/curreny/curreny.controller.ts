import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrenyService } from './curreny.service';
import { CreateCurrenyDto } from './dto/create-curreny.dto';
import { UpdateCurrenyDto } from './dto/update-curreny.dto';

@Controller('currencies')
export class CurrenyController {
  constructor(private readonly currenyService: CurrenyService) {}

  @Post()
  create(@Body() createCurrenyDto: CreateCurrenyDto) {
    return this.currenyService.create(createCurrenyDto);
  }

  @Get()
  findAll() {
    return this.currenyService.findAll();
  }

  @Get(':curreny')
  findOne(@Param('curreny') id: string) {
    return this.currenyService.findOne(+id);
  }

  @Patch(':curreny')
  update(
    @Param('curreny') id: string,
    @Body() updateCurrenyDto: UpdateCurrenyDto,
  ) {
    return this.currenyService.update(+id, updateCurrenyDto);
  }

  @Delete(':curreny')
  remove(@Param('curreny') id: string) {
    return this.currenyService.remove(+id);
  }
}
