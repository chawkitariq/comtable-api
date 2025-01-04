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
    await this.createBulkDocumentArticle(document, articles);
  }

  async createBulkDocumentArticle(
    document: DocumentEntity,
    dtos: CreateDocumentArticleDto[],
  ) {
    await this.documentArticleRepository.manager.transaction(
      async (manager) => {
        for (const dto of dtos) {
          const documentArticle = await manager.save(DocumentArticleEntity, {
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
    documentArticle: DocumentArticleEntity,
    dtos: CreateDocumentArticleTaxDto[],
  ) {
    await manager.transaction(async (transactionManager) => {
      for (const dto of dtos) {
        await transactionManager.save(DocumentArticleTaxEntity, {
          ...dto,
          documentArticle,
        });
      }
    });
  }

  findAll(companyId: string) {
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
