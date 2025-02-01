import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
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

  async update(id: string, { documentArticles, ...dto }: UpdateDocumentDto) {
    return this.repository.manager.transaction(async (manager) => {
      await manager.update(DocumentEntity, id, dto);

      await this.removeDocumentArticles(manager, documentArticles);
      await this.mutateDocumentArticles(manager, documentArticles);

      return manager.findOneBy(DocumentEntity, { id });
    });
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }

  private async removeDocumentArticles(
    manager: EntityManager,
    documentArticles: UpdateDocumentDto['documentArticles'],
  ) {
    const removableDocumentArticleIds = documentArticles
      ?.filter(({ remove }) => remove)
      .map(({ id }) => id);

    const removableDocumentArticleTaxIds = documentArticles
      ?.filter(({ documentArticleTaxes }) =>
        documentArticleTaxes?.some(({ remove }) => remove),
      )
      .flatMap(({ documentArticleTaxes }) => documentArticleTaxes)
      .filter(({ remove }) => remove)
      .map(({ id }) => id);

    if (removableDocumentArticleIds.length) {
      await manager.softDelete(
        DocumentArticleEntity,
        removableDocumentArticleIds,
      );
    }

    if (removableDocumentArticleTaxIds.length) {
      await manager.softDelete(
        DocumentArticleTaxEntity,
        removableDocumentArticleTaxIds,
      );
    }
  }

  private async mutateDocumentArticles(
    manager: EntityManager,
    documentArticles: UpdateDocumentDto['documentArticles'],
  ) {
    const creatableDocumentArticles = documentArticles
      ?.filter(({ remove }) => !remove)
      .map(({ documentArticleTaxes, ...documentArticle }) => ({
        ...documentArticle,
        documentArticleTaxes: documentArticleTaxes?.filter(
          ({ remove }) => !remove,
        ),
      }));

    if (creatableDocumentArticles.length) {
      for (const documentArticleDto of creatableDocumentArticles) {
        const documentArticle = await manager.save(
          DocumentArticleEntity,
          documentArticleDto,
        );

        if (documentArticleDto.documentArticleTaxes.length) {
          for (const documentArticleTaxDto of documentArticleDto.documentArticleTaxes) {
            await manager.save(DocumentArticleTaxEntity, {
              ...documentArticleTaxDto,
              documentArticle,
            });
          }
        }
      }
    }
  }
}
