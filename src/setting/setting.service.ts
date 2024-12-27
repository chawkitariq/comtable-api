import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dtos/create-setting.dto';
import { UpdateSettingDto } from './dtos/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    public readonly settingRepository: Repository<Setting>,
  ) {}

  create(dto: CreateSettingDto) {
    return this.settingRepository.save(dto);
  }

  findAll() {
    return this.settingRepository.find();
  }

  findOne(id: string) {
    return this.settingRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateSettingDto) {
    return this.settingRepository.update(id, dto);
  }

  remove(id: string) {
    return this.settingRepository.softDelete(id);
  }
}
