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
    public readonly documentRepository: Repository<DocumentEntity>,
    private readonly documentArticleService: DocumentArticleService,
    private readonly documentArticleTaxService: DocumentArticleTaxService,
  ) {}

  async create({ articles = [], ...dto }: CreateDocumentDto) {
    const document = await this.documentRepository.save(dto);
    await this.documentRepository.manager.transaction((manager) =>
      this.documentArticleService.createMany(
        manager,
        document,
        articles,
        ({ taxes }, documentArticle) =>
          this.documentArticleTaxService.createMany(
            manager,
            documentArticle,
            taxes,
          ),
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
    await this.documentRepository.manager.transaction((manager) =>
      this.documentArticleService.updateMany(manager, articles, ({ taxes }) =>
        this.documentArticleTaxService.updateMany(manager, taxes),
      ),
    );
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
