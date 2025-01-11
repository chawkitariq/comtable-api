import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    public readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  create(dto: CreateDocumentDto) {
    return this.documentRepository.save(dto);
  }

  findAll(companyId: string) {
    return this.documentRepository.find({
      where: {
        company: { id: companyId },
      },
      relations: ['articles', 'contact', 'category', 'company', 'createdBy'],
    });
  }

  findOne(id: string) {
    return this.documentRepository.findOne({
      where: { id },
      relations: ['articles', 'contact', 'category', 'company', 'createdBy'],
    });
  }

  update(id: string, dto: UpdateDocumentDto) {
    return this.documentRepository.update(id, dto);
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
