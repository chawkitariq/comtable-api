import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @Get(':setting')
  findOne(@Param('setting') id: string) {
    return this.settingService.findOne(+id);
  }

  @Patch(':setting')
  update(
    @Param('setting') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingService.update(+id, updateSettingDto);
  }

  @Delete(':setting')
  remove(@Param('setting') id: string) {
    return this.settingService.remove(+id);
  }
}
