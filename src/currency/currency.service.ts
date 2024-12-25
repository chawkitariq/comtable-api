import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    public readonly currencyRepository: Repository<Currency>,
  ) {}

  create(dto: CreateCurrencyDto) {
    return this.currencyRepository.save(dto);
  }

  findAll() {
    return this.currencyRepository.find();
  }

  findOne(id: string) {
    return this.currencyRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateCurrencyDto) {
    return this.currencyRepository.update(id, dto);
  }

  remove(id: string) {
    return this.currencyRepository.softDelete(id);
  }
}
