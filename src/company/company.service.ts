import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    public readonly companyRepository: Repository<CompanyEntity>,
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

  findEnabledByUser(userId: string) {
    return this.companyRepository.findOneBy({
      createdBy: { id: userId },
      isEnabled: true,
    });
  }

  enable(id: string) {
    return this.companyRepository.update(id, { isEnabled: true });
  }

  disableByUser(userId: string) {
    return this.companyRepository.update(
      { createdBy: { id: userId }, isEnabled: true },
      { isEnabled: false },
    );
  }

  remove(id: string) {
    return this.companyRepository.softDelete(id);
  }
}
