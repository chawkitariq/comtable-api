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
    public readonly documentArticleRepository: Repository<DocumentArticleEntity>,
  ) {}

  async createMany(
    manager: EntityManager,
    document: DocumentEntity,
    dtos: CreateDocumentArticleDto[] = [],
    onEach?: (
      dto: CreateDocumentArticleDto,
      documentArticle: DocumentArticleEntity,
    ) => Promise<any>,
  ) {
    for (const dto of dtos) {
      const documentArticle = await manager.save(DocumentArticleEntity, {
        ...dto,
        document,
      });
      onEach?.(dto, documentArticle);
    }
  }

  async updateMany(
    manager: EntityManager,
    dtos: UpdateDocumentArticleDto[] = [],
    onEach?: (dto: UpdateDocumentArticleDto) => Promise<any>,
  ) {
    for (const { id, ...dto } of dtos) {
      await manager.update(DocumentArticleEntity, id, dto);
      onEach?.({ ...dto, id });
    }
  }
}
