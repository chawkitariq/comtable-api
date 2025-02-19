import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    public readonly repository: Repository<ArticleEntity>,
  ) {}

  create(dto: CreateArticleDto) {
    return this.repository.save(dto);
  }

  findAll(companyId: string) {
    return this.repository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });
  }

  findOneByCompany(id: string, companyId: string) {
    return this.repository.findOne({
      where: { id, company: { id: companyId } },
      relations: ['company'],
    });
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
}
