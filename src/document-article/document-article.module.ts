import { Module } from '@nestjs/common';
import { DocumentArticleService } from './document-article.service';
import { DocumentArticleController } from './document-article.controller';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentArticleEntity])],
  controllers: [DocumentArticleController],
  providers: [DocumentArticleService],
  exports: [DocumentArticleService],
})
export class DocumentArticleModule {}
