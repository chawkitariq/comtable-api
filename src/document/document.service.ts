import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    public readonly documentRepository: Repository<Document>,
  ) {}

  create(dto: CreateDocumentDto) {
    return this.documentRepository.save(dto);
  }

  findAllByCompany(companyId: string) {
    return this.documentRepository.find({
      where: {
        company: { id: companyId },
      },
    });
  }

  findOne(id: string) {
    return this.documentRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateDocumentDto) {
    return this.documentRepository.update(id, dto);
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
