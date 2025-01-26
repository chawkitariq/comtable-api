import { Injectable } from '@nestjs/common';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DocumentArticleService {
  constructor(
    @InjectRepository(DocumentArticleEntity)
    public readonly repository: Repository<DocumentArticleEntity>,
  ) {}

  findAllByDocument(documentId: string) {
    return this.repository.find({
      where: {
        document: { id: documentId },
      },
    });
  }

  findOne(documentArticleId: string) {
    return this.repository.findOne({
      where: {
        id: documentArticleId,
      },
    });
  }
}
