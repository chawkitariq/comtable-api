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
    const documentArticles = this.repository.manager.create(
      DocumentArticleEntity,
      dto?.documentArticles.map((documentArticle) => ({
        ...documentArticle,
        ...(documentArticle.documentArticleTaxes && {
          documentArticleTaxes: this.repository.manager?.create(
            DocumentArticleTaxEntity,
            documentArticle.documentArticleTaxes,
          ),
        }),
      })),
    );

    const document = this.repository.create({
      ...dto,
      ...(documentArticles && { documentArticles }),
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
    const removableDocumentArticles = dto.documentArticles?.filter(
      ({ remove }) => remove,
    );

    const removableDocumentArticleTaxes = dto?.documentArticles
      .filter(({ documentArticleTaxes }) =>
        documentArticleTaxes?.some(({ remove }) => remove),
      )
      .flatMap(({ documentArticleTaxes }) => documentArticleTaxes)
      .filter((remove) => remove);

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

    const updatableDocumentArticles = dto.documentArticles
      ?.filter(({ remove }) => !remove)
      .map((documentArticle) => ({
        ...documentArticle,
        documentArticleTaxes: documentArticle.documentArticleTaxes?.filter(
          ({ remove }) => !remove,
        ),
      }));

    const document = await this.findOne(id);

    const documentArticles = [
      ...this.repository.manager.create(
        DocumentArticleEntity,
        updatableDocumentArticles?.map((documentArticle) => ({
          ...documentArticle,
          ...(documentArticle.documentArticleTaxes && {
            documentArticleTaxes: [
              ...this.repository.manager.create(
                DocumentArticleTaxEntity,
                documentArticle.documentArticleTaxes,
              ),
              ...document.documentArticles.find(
                ({ id }) => id === documentArticle.id,
              ).documentArticleTaxes,
            ],
          }),
        })),
      ),
      ...document.documentArticles,
    ];

    return this.repository.save({
      id,
      ...(documentArticles && { documentArticles }),
    });
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
