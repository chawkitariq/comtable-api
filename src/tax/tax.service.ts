import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax } from './entities/tax.entity';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(Tax)
    public readonly taxRepository: Repository<Tax>,
  ) {}

  create(dto: CreateTaxDto) {
    return this.taxRepository.save(dto);
  }

  findAll() {
    return this.taxRepository.find();
  }

  findOne(id: string) {
    return this.taxRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateTaxDto) {
    return this.taxRepository.update(id, dto);
  }

  remove(id: string) {
    return this.taxRepository.softDelete(id);
  }
}
