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
    @Body() dto: CreateArticleDto,
  ) {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new BadRequestException('Company does not exists');
    }

    return this.articleService.create({
      ...dto,
      company,
    });
  }

  @Get('companies/:companyId/articles')
  async findAll(@Param('companyId') companyId: string) {
    return this.articleService.findAll(companyId);
  }

  @Get('/articles/:articleId')
  async findOne(@Param('articleId') articleId: string) {
    const article = await this.articleService.findOne(articleId);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  @Patch('/articles/:articleId')
  async update(
    @Param('articleId') articleId: string,
    @Body() dto: UpdateArticleDto,
  ) {
    await this.articleService.update(articleId, dto);
    return this.articleService.findOne(articleId);
  }

  @Delete('/articles/:articleId')
  async remove(@Param('articleId') articleId: string) {
    await this.articleService.remove(articleId);
  }
}
