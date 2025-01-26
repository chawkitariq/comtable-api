import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';
import { DocumentArticleService } from 'src/document-article/document-article.service';
import { DocumentArticleTaxService } from 'src/document-article-tax/document-article-tax.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    public readonly repository: Repository<DocumentEntity>,
    public readonly documentArticleService: DocumentArticleService,
    public readonly documentArticleTaxService: DocumentArticleTaxService,
  ) {}

  create(dto: CreateDocumentDto) {
    const document = this.repository.create({
      ...dto,
      ...(dto.articles && {
        articles: this.documentArticleService.repository.create(
          dto.articles.map((article) => ({
            ...article,
            ...(article.taxes && {
              taxes: this.documentArticleTaxService.repository.create(
                article.taxes,
              ),
            }),
          })),
        ),
      }),
    });

    return this.repository.save(document);
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

  update(id: string, dto: UpdateDocumentDto) {
    return this.repository.save({
      id,
      ...(dto.articles && {
        articles: this.documentArticleService.repository.create(
          dto.articles.map((article) => ({
            ...article,
            ...(article.taxes && {
              taxes: this.documentArticleTaxService.repository.create(
                article.taxes,
              ),
            }),
          })),
        ),
      }),
    });
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
