import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dtos/create-tax.dto';
import { UpdateTaxDto } from './dtos/update-tax.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  findAllByCompany(companyId: string) {
    return this.taxRepository.findBy({ company: { id: companyId } });
  }

  findAllByIds(taxIds: string[]) {
    return this.taxRepository.findBy({ id: In(taxIds) });
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
