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
    public readonly repository: Repository<DocumentArticleTaxEntity>,
  ) {}

  findAllByDocumentArticle(documentArticleId: string) {
    return this.repository.find({
      where: {
        documentArticle: { id: documentArticleId },
      },
      relations: ['company', 'document', 'documentArticle', 'tax', 'createdBy'],
    });
  }

  async createMany(
    manager: EntityManager,
    documentArticle: DocumentArticleEntity,
    dtos: CreateDocumentArticleTaxDto[] = [],
  ) {
    const documentArticles = dtos.map((dto) =>
      manager.save(DocumentArticleTaxEntity, {
        ...dto,
        documentArticle,
      }),
    );

    return Promise.all(documentArticles);
  }

  async updateMany(
    manager: EntityManager,
    dtos: UpdateDocumentArticleTaxDto[] = [],
  ) {
    const documentArticles = dtos.map(({ id, ...dto }) =>
      manager.update(DocumentArticleTaxEntity, id, dto),
    );

    return Promise.all(documentArticles);
  }

  async removeMany(
    manager: EntityManager,
    documentArticleTaxIds: string[] = [],
  ) {
    const documentArticles = documentArticleTaxIds.map((id) =>
      manager.softDelete(DocumentArticleTaxEntity, id),
    );

    return Promise.all(documentArticles);
  }
}
