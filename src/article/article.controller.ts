import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { CompanyService } from 'src/company/company.service';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('companies/:companyId/articles')
  async create(
    @Param('companyId') companyId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new BadRequestException('Company not exists');
    }

    return this.articleService.create({
      ...createArticleDto,
      company,
    });
  }

  @Get('companies/:companyId/articles')
  async findAll(@Param('companyId') companyId: string) {
    return this.articleService.findAllByCompany(companyId);
  }

  @Get('/articles/:articleId')
  async findOne(@Param('article') articleId: string) {
    const article = await this.articleService.findOne(articleId);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  @Patch('/articles/:articleId')
  async update(
    @Param('article') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const { affected } = await this.articleService.update(
      articleId,
      updateArticleDto,
    );

    if (!affected) {
      throw new NotFoundException('Article not found');
    }

    return this.findOne(articleId);
  }

  @Delete('/articles/:articleId')
  async remove(@Param('article') articleId: string) {
    const { affected } = await this.articleService.remove(articleId);

    if (!affected) {
      throw new NotFoundException('Article not found');
    }
  }
}
