import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';
import { DocumentArticleEntity } from 'src/document-article/entities/document-article.entity';
import { DocumentArticleTaxEntity } from 'src/document-article-tax/entities/document-article-tax.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    public readonly repository: Repository<DocumentEntity>,
  ) {}

  create(dto: CreateDocumentDto) {
    const articles = this.repository.manager.create(
      DocumentArticleEntity,
      dto?.articles.map((article) => ({
        ...article,
        ...(article.taxes && {
          taxes: this.repository.manager?.create(
            DocumentArticleTaxEntity,
            article.taxes,
          ),
        }),
      })),
    );

    const document = this.repository.create({
      ...dto,
      ...(articles && { articles }),
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

  async update(id: string, dto: UpdateDocumentDto) {
    const { articles = [] } = dto;

    // Filter out articles to remove
    const removableDocumentArticles = articles.filter(({ remove }) => remove);

    // Filter out taxes to remove
    const removableDocumentArticleTaxes = articles
      .flatMap(({ taxes }) => taxes ?? [])
      .filter(({ remove }) => remove);

    // Remove articles and taxes that should be removed
    await this.repository.manager.remove(
      [
        ...this.repository.manager.create(
          DocumentArticleEntity,
          removableDocumentArticles,
        ),
        ...this.repository.manager.create(
          DocumentArticleTaxEntity,
          removableDocumentArticleTaxes,
        ),
      ],
      { transaction: true },
    );

    // Prepare updatable articles, filtering out ones that are marked for removal
    const updatableDocumentArticles = articles
      .filter(({ remove }) => !remove)
      .map(({ taxes, ...article }) => ({
        ...article,
        taxes: taxes?.filter(({ remove }) => !remove),
      }));

    // Fetch the current document to update
    const document = await this.findOne(id);

    // Combine the new and old articles
    const updatedArticles = [
      ...this.repository.manager.create(
        DocumentArticleEntity,
        updatableDocumentArticles.map((article) => ({
          ...article,
          ...(article.taxes && {
            taxes: [
              ...this.repository.manager.create(
                DocumentArticleTaxEntity,
                article.taxes,
              ),
              ...document.articles.find(({ id }) => id === article.id)?.taxes,
            ],
          }),
        })),
      ),
      ...document.articles,
    ];

    // Save the updated document with the new list of articles
    return this.repository.save({ id, articles: updatedArticles });
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
