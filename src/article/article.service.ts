import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    public readonly articleRepository: Repository<Article>,
  ) {}

  create(dto: CreateArticleDto) {
    return this.articleRepository.save(dto);
  }

  findAll() {
    return this.articleRepository.find();
  }

  findOne(id: string) {
    return this.articleRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateArticleDto) {
    return this.articleRepository.update(id, dto);
  }

  remove(id: string) {
    return this.articleRepository.softDelete(id);
  }
}
