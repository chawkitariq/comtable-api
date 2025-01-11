import { Module } from '@nestjs/common';
import { DocumentArticleTaxController } from './document-article-tax.controller';
import { DocumentArticleTaxService } from './document-article-tax.service';
import { DocumentArticleTaxEntity } from './entities/document-article-tax.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentArticleModule } from 'src/document-article/document-article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentArticleTaxEntity]),
    DocumentArticleModule,
  ],
  controllers: [DocumentArticleTaxController],
  providers: [DocumentArticleTaxService],
  exports: [DocumentArticleTaxService],
})
export class DocumentArticleTaxModule {}
