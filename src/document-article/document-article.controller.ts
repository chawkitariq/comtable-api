import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateManyDocumentArticleDto } from './dtos/create-document-article.dto';
import { DocumentService } from 'src/document/document.service';
import { DocumentArticleService } from './document-article.service';
import { UpdateManyDocumentArticleDto } from './dtos/update-document-article.dto';
import { RemoveManyDocumentArticleDto } from './dtos/remove-many-document-article.dto';

@Controller()
export class DocumentArticleController {
  constructor(
    private readonly documentArticleService: DocumentArticleService,
    private readonly documentService: DocumentService,
  ) {}

  @Post('/documents/:documentId/documentarticles')
  async create(
    @Param('documentId') documentId: string,
    @Body() { documentArticles }: CreateManyDocumentArticleDto,
  ) {
    const document = await this.documentService.findOne(documentId);

    if (!document) {
      throw new BadRequestException('Document does not exists');
    }

    return this.documentArticleService.repository.manager.transaction(
      (manager) =>
        this.documentArticleService.createMany(
          manager,
          document,
          documentArticles,
        ),
    );
  }

  @Get('/documents/:documentId/documentarticles')
  async findAll(@Param('documentId') documentId: string) {
    const document = await this.documentService.findOne(documentId);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return this.documentArticleService.findAllByDocument(documentId);
  }

  @Patch('/documentarticles')
  updateMany(@Body() { documentArticles }: UpdateManyDocumentArticleDto) {
    return this.documentArticleService.repository.manager.transaction(
      (manager) =>
        this.documentArticleService.updateMany(manager, documentArticles),
    );
  }

  @Delete('/documentarticles')
  removeMany(
    @Body()
    { documentArticleIds }: RemoveManyDocumentArticleDto,
  ) {
    return this.documentArticleService.repository.manager.transaction(
      (manager) =>
        this.documentArticleService.removeMany(manager, documentArticleIds),
    );
  }
}
