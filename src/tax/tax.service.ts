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
    public readonly repository: Repository<TaxEntity>,
  ) {}

  create(dto: CreateTaxDto) {
    return this.repository.save(dto);
  }

  findAllByCompany(companyId: string) {
    return this.repository.findBy({ company: { id: companyId } });
  }

  findAllByIds(taxIds: string[]) {
    return this.repository.findBy({ id: In(taxIds) });
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, dto: UpdateTaxDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
