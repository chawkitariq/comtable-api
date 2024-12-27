import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentArticle } from './entities/document-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentArticle])],
})
export class DocumentArticleModule {}
