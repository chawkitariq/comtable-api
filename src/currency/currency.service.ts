import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    public readonly repository: Repository<CurrencyEntity>,
  ) {}

  create(dto: CreateCurrencyDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find({
      relations: ['company', 'createdBy'],
    });
  }

  findAllByCompany(companyId: string) {
    return this.repository.find({
      where: {
        company: { id: companyId },
      },
      relations: ['company', 'createdBy'],
    });
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: ['company', 'createdBy'],
    });
  }

  update(id: string, dto: UpdateCurrencyDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
