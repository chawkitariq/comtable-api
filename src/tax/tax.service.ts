import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dtos/create-tax.dto';
import { UpdateTaxDto } from './dtos/update-tax.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxEntity } from './entities/tax.entity';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(TaxEntity)
    public readonly taxRepository: Repository<TaxEntity>,
  ) {}

  create(dto: CreateTaxDto) {
    return this.taxRepository.save(dto);
  }

  findAll(companyId: string) {
    return this.taxRepository.find({
      where: { company: { id: companyId } },
      relations: ['company', 'createdBy'],
    });
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
