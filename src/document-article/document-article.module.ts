import { Module } from '@nestjs/common';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentArticleEntity])],
})
export class DocumentArticleModule {}
