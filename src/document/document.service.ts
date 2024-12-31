import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { DocumentArticle } from './entities/document-article.entity';
import { DocumentArticleTax } from './entities/document-article-tax.entity';
import { CreateDocumentArticleDto } from './dtos/create-document-article.dto';
import { CreateDocumentArticleTaxDto } from './dtos/create-document-article-tax.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    public readonly documentRepository: Repository<Document>,
    @InjectRepository(DocumentArticle)
    public readonly documentArticleRepository: Repository<DocumentArticle>,
    @InjectRepository(DocumentArticleTax)
    public readonly documentArticleTaxRepository: Repository<DocumentArticleTax>,
  ) {}

  async create({ articles = [], ...dto }: CreateDocumentDto) {
    const document = await this.documentRepository.save(dto);
    await this.createBulkDocumentArticle(document, articles);
  }

  async createBulkDocumentArticle(
    document: Document,
    articles: CreateDocumentArticleDto[],
  ) {
    await this.documentArticleRepository.manager.transaction(
      async (manager) => {
        for (const dto of articles) {
          const documentArticle = await manager.save(DocumentArticle, {
            ...dto,
            document,
          });
          if (dto.taxes) {
            await this.createBulkDocumentArticleTax(
              manager,
              documentArticle,
              dto.taxes,
            );
          }
        }
      },
    );
  }

  async createBulkDocumentArticleTax(
    manager: EntityManager,
    documentArticle: DocumentArticle,
    taxes: CreateDocumentArticleTaxDto[],
  ) {
    await manager.transaction(async (transactionManager) => {
      for (const dto of taxes) {
        await transactionManager.save(DocumentArticleTax, {
          ...dto,
          documentArticle,
        });
      }
    });
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
