import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DocumentArticleTaxService } from './document-article-tax.service';
import { DocumentArticleService } from 'src/document-article/document-article.service';
import { RemoveManyDocumentArticleTaxDto } from './dtos/remove-many-document-article-tax.dto';

@Controller()
export class DocumentArticleTaxController {
  constructor(
    private readonly documentArticleTaxService: DocumentArticleTaxService,
    private readonly documentArticleService: DocumentArticleService,
  ) {}

  @Get('/documentarticles/:documentArticleId/documentarticletaxes')
  async findAll(@Param('documentArticleId') documentArticleId: string) {
    const documentArticle =
      await this.documentArticleService.findOne(documentArticleId);

    if (!documentArticle) {
      throw new NotFoundException('DocumentArticle not found');
    }

    return this.documentArticleTaxService.findAllByDocumentArticle(
      documentArticleId,
    );
  }

  @Delete('/documentarticletaxes')
  removeMany(
    @Body() { documentArticleTaxIds }: RemoveManyDocumentArticleTaxDto,
  ) {
    return this.documentArticleTaxService.repository.softDelete(
      documentArticleTaxIds,
    );
  }
}
