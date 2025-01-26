import { forwardRef, Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { DocumentController } from './document.controller';
import { DocumentArticleModule } from 'src/document-article/document-article.module';
import { DocumentArticleTaxModule } from 'src/document-article-tax/document-article-tax.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity]),
    CompanyModule,
    forwardRef(() => DocumentArticleModule),
    forwardRef(() => DocumentArticleTaxModule),
  ],
  // controllers: [DocumentController],
  providers: [DocumentService, DocumentController],
  exports: [DocumentService, DocumentController],
})
export class DocumentModule {}
