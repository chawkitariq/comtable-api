import { Injectable } from '@nestjs/common';
import { DocumentArticleTaxEntity } from './entities/document-article-tax.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UpdateDocumentArticleTaxDto } from './dtos/update-document-article-tax.dto';
import { DocumentArticleEntity } from 'src/document-article/entities/document-article.entity';
import { CreateDocumentArticleTaxDto } from './dtos/create-document-article-tax.dto';

@Injectable()
export class DocumentArticleTaxService {
  constructor(
    @InjectRepository(DocumentArticleTaxEntity)
    public readonly documentArticleTaxRepository: Repository<DocumentArticleTaxEntity>,
  ) {}

  async createMany(
    manager: EntityManager,
    documentArticle: DocumentArticleEntity,
    dtos: CreateDocumentArticleTaxDto[] = [],
    onEach?: (
      dto: CreateDocumentArticleTaxDto,
      documentArticleTax: DocumentArticleTaxEntity,
    ) => Promise<any>,
  ) {
    for (const dto of dtos) {
      const documentArticleTax = await manager.save(DocumentArticleTaxEntity, {
        ...dto,
        documentArticle,
      });
      onEach?.(dto, documentArticleTax);
    }
  }

  async updateMany(
    manager: EntityManager,
    dtos: UpdateDocumentArticleTaxDto[] = [],
    onEach?: (dto: UpdateDocumentArticleTaxDto) => Promise<any>,
  ) {
    for (const { id, ...dto } of dtos) {
      await manager.update(DocumentArticleTaxEntity, id, dto);
      onEach?.({ ...dto, id });
    }
  }
}
