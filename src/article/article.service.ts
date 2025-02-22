import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxEntity } from 'src/tax/entities/tax.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { ArticleTaxEntity } from './entities/article-tax.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    public readonly repository: Repository<ArticleEntity>,
  ) {}

  create(dto: CreateArticleDto) {
    return this.repository.save(dto);
  }

  findAllByCompany(companyId: string) {
    return this.repository.findBy({ company: { id: companyId } });
  }

  findOneByCompany(id: string, companyId: string) {
    return this.repository.findOneBy({ id, company: { id: companyId } });
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateArticleDto) {
    return this.repository.save({ id, ...dto });
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }

  createArticleTax({
    tax,
    company,
  }: {
    tax: TaxEntity;
    company?: CompanyEntity;
  }) {
    const articleTax = new ArticleTaxEntity();
    articleTax.company = company;
    articleTax.tax = tax;
    return articleTax;
  }
}
