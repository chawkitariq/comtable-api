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
    public readonly repository: Repository<DocumentEntity>,
  ) {}

  create(dto: CreateDocumentDto) {
    return this.repository.save(dto);
  }

  findAll(companyId: string) {
    return this.repository.find({
      where: {
        company: { id: companyId },
      },
    });
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateDocumentDto) {
    return this.repository.manager.transaction(async (manager) => {
      await manager.save(DocumentEntity, { id, ...dto });
      return manager.findOneBy(DocumentEntity, { id });
    });
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
