import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DocumentService } from 'src/document/document.service';
import { DocumentArticleService } from './document-article.service';
import { RemoveManyDocumentArticleDto } from './dtos/remove-many-document-article.dto';

@Controller()
export class DocumentArticleController {
  constructor(
    private readonly documentArticleService: DocumentArticleService,
    private readonly documentService: DocumentService,
  ) {}

  @Get('/documents/:documentId/documentarticles')
  async findAll(@Param('documentId') documentId: string) {
    const document = await this.documentService.findOne(documentId);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return this.documentArticleService.findAllByDocument(documentId);
  }

  @Delete('/documentarticles')
  removeMany(
    @Body()
    { documentArticleIds }: RemoveManyDocumentArticleDto,
  ) {
    return this.documentArticleService.repository.softDelete(
      documentArticleIds,
    );
  }
}
