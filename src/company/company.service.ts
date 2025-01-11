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

  findAllByUser(userId: string) {
    return this.companyRepository.find({
      where: { createdBy: { id: userId } },
    });
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  findOneByUser(companyId: string, userId: string) {
    return this.companyRepository.findOne({
      where: { id: companyId, createdBy: { id: userId } },
    });
  }

  update(id: string, dto: UpdateCompanyDto) {
    return this.companyRepository.update(id, dto);
  }

  updateByUser(id: string, userId: string, dto: UpdateCompanyDto) {
    return this.companyRepository.update(
      {
        id,
        createdBy: { id: userId },
      },
      dto,
    );
  }

  remove(id: string) {
    return this.companyRepository.softDelete(id);
  }

  removeByUser(id: string, userId: string) {
    return this.companyRepository.softDelete({
      id,
      createdBy: { id: userId },
    });
  }
}
