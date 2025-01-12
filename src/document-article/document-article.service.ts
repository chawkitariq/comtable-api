import { Injectable } from '@nestjs/common';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from 'src/document/entities/document.entity';
import { CreateDocumentArticleDto } from './dtos/create-document-article.dto';
import { UpdateDocumentArticleDto } from './dtos/update-document-article.dto';

@Injectable()
export class DocumentArticleService {
  constructor(
    @InjectRepository(DocumentArticleEntity)
    public readonly repository: Repository<DocumentArticleEntity>,
  ) {}

  findAllByDocument(documentId: string) {
    return this.repository.find({
      where: {
        document: { id: documentId },
      },
      relations: ['taxes', 'company', 'document', 'article', 'createdBy'],
    });
  }

  findOne(documentArticleId: string) {
    return this.repository.findOne({
      where: {
        id: documentArticleId,
      },
      relations: ['taxes', 'company', 'document', 'article', 'createdBy'],
    });
  }

  async createMany(
    manager: EntityManager,
    document: DocumentEntity,
    dtos: CreateDocumentArticleDto[] = [],
  ) {
    for (const dto of dtos) {
      await manager.save(DocumentArticleEntity, {
        ...dto,
        document,
      });
    }
  }

  async updateMany(
    manager: EntityManager,
    dtos: UpdateDocumentArticleDto[] = [],
  ) {
    for (const { id, ...dto } of dtos) {
      await manager.update(DocumentArticleEntity, id, dto);
    }
  }

  async removeMany(manager: EntityManager, documentArticleIds: string[] = []) {
    for (const id of documentArticleIds) {
      await manager.softDelete(DocumentArticleEntity, id);
    }
  }
}
