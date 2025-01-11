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
import { DocumentArticleTaxService } from './document-article-tax.service';
import { DocumentArticleService } from 'src/document-article/document-article.service';
import { CreateManyDocumentArticleTaxDto } from './dtos/create-document-article-tax.dto';
import { UpdateManyDocumentArticleTaxDto } from './dtos/update-document-article-tax.dto';

@Controller()
export class DocumentArticleTaxController {
  constructor(
    private readonly documentArticleTaxService: DocumentArticleTaxService,
    private readonly documentArticleService: DocumentArticleService,
  ) {}

  @Post('/documentarticles/:documentArticleId/documentarticletaxes')
  async create(
    @Param('documentArticleId') documentArticleId: string,
    @Body() { documentArticleTaxes }: CreateManyDocumentArticleTaxDto,
  ) {
    const documentArticle =
      await this.documentArticleService.findOne(documentArticleId);

    if (!documentArticle) {
      throw new BadRequestException('DocumentArticle does not exists');
    }

    return this.documentArticleTaxService.repository.manager.transaction(
      (manager) =>
        this.documentArticleTaxService.createMany(
          manager,
          documentArticle,
          documentArticleTaxes,
        ),
    );
  }

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

  @Patch('/documentarticletaxes')
  updateMany(
    @Body() { documentArticleTaxes }: UpdateManyDocumentArticleTaxDto,
  ) {
    return this.documentArticleTaxService.repository.manager.transaction(
      (manager) =>
        this.documentArticleTaxService.updateMany(
          manager,
          documentArticleTaxes,
        ),
    );
  }

  @Delete('/documentarticletaxes')
  removeMany(@Body() documentArticleIds: string[]) {
    return this.documentArticleTaxService.repository.manager.transaction(
      (manager) =>
        this.documentArticleTaxService.removeMany(manager, documentArticleIds),
    );
  }
}
