import { Injectable } from '@nestjs/common';
import { DocumentArticleTaxEntity } from './entities/document-article-tax.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
