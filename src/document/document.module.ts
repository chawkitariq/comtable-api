import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { DocumentTotal } from './entities/document-total.entity';
import { DocumentArticleModule } from 'src/document-article/document-article.module';
import { DocumentArticleTaxModule } from 'src/document-article-tax/document-article-tax.module';
import { DocumentController } from './document.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity, DocumentTotal]),
    CompanyModule,
    DocumentArticleModule,
    DocumentArticleTaxModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
