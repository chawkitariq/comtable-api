import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    public readonly companyRepository: Repository<Company>,
  ) {}

  create(dto: CreateCompanyDto) {
    return this.companyRepository.save(dto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateCompanyDto) {
    return this.companyRepository.update(id, dto);
  }

  remove(id: string) {
    return this.companyRepository.softDelete(id);
  }
}
