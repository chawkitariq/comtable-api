import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { DocumentArticleTaxEntity } from './entities/document-article-tax.entity';
import { CreateDocumentArticleDto } from './dtos/create-document-article.dto';
import { CreateDocumentArticleTaxDto } from './dtos/create-document-article-tax.dto';
import { UpdateDocumentArticleDto } from './dtos/update-document-article.dto';
import { UpdateDocumentArticleTaxDto } from './dtos/update-document-article-tax.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    public readonly documentRepository: Repository<DocumentEntity>,
    @InjectRepository(DocumentArticleEntity)
    public readonly documentArticleRepository: Repository<DocumentArticleEntity>,
    @InjectRepository(DocumentArticleTaxEntity)
    public readonly documentArticleTaxRepository: Repository<DocumentArticleTaxEntity>,
  ) {}

  async create({ articles = [], ...dto }: CreateDocumentDto) {
    const document = await this.documentRepository.save(dto);
    await this.documentArticleTaxRepository.manager.transaction((manager) =>
      this.createBulkDocumentArticle(
        manager,
        document,
        articles,
        ({ taxes }, documentArticle) =>
          this.createBulkDocumentArticleTax(manager, documentArticle, taxes),
      ),
    );
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

  async update(id: string, { articles = [], ...dto }: UpdateDocumentDto) {
    await this.documentRepository.update(id, dto);
    await this.documentArticleRepository.manager.transaction((manager) =>
      this.updateBulkDocumentArticle(manager, articles, ({ taxes }) =>
        this.updateBulkDocumentArticleTax(manager, taxes),
      ),
    );
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }

  async createBulkDocumentArticle(
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
      if (onEach) {
        await onEach(dto, documentArticle);
      }
    }
  }

  async createBulkDocumentArticleTax(
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
      if (onEach) {
        await onEach(dto, documentArticleTax);
      }
    }
  }

  async updateBulkDocumentArticle(
    manager: EntityManager,
    dtos: UpdateDocumentArticleDto[] = [],
    onEach?: (dto: UpdateDocumentArticleDto) => Promise<any>,
  ) {
    for (const { id, ...dto } of dtos) {
      await manager.update(DocumentArticleEntity, id, dto);
      if (onEach) {
        await onEach({ ...dto, id });
      }
    }
  }

  async updateBulkDocumentArticleTax(
    manager: EntityManager,
    dtos: UpdateDocumentArticleTaxDto[] = [],
    onEach?: (dto: UpdateDocumentArticleTaxDto) => Promise<any>,
  ) {
    for (const { id, ...dto } of dtos) {
      await manager.update(DocumentArticleTaxEntity, id, dto);
      if (onEach) {
        await onEach({ ...dto, id });
      }
    }
  }
}
