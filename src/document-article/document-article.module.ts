import { Module } from '@nestjs/common';
import { DocumentArticleService } from './document-article.service';
import { DocumentArticleController } from './document-article.controller';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from 'src/document/document.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentArticleEntity]), DocumentModule],
  controllers: [DocumentArticleController],
  providers: [DocumentArticleService],
  exports: [DocumentArticleService],
})
export class DocumentArticleModule {}
