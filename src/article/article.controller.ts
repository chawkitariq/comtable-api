import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Company } from 'src/company/decorators/company.decorator';
import { EnabledCompanyGuard } from 'src/company/guards/enabled-company.guard';

@Controller('articles')
@UseGuards(EnabledCompanyGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(
    @Company() company: CompanyEntity,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleService.create({
      ...createArticleDto,
      company,
    });
  }

  @Get()
  async findAll(@Company() company: CompanyEntity) {
    return this.articleService.findAllByCompany(company.id);
  }

  @Get(':article')
  async findOne(
    @Company() company: CompanyEntity,
    @Param('article') articleId: string,
  ) {
    const article = await this.articleService.findOneByCompany(
      articleId,
      company.id,
    );

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  @Patch(':article')
  update(
    @Company() company: CompanyEntity,
    @Param('article') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(articleId, updateArticleDto);
  }

  @Delete(':article')
  remove(
    @Company() company: CompanyEntity,
    @Param('article') articleId: string,
  ) {
    return this.articleService.remove(articleId);
  }
}
