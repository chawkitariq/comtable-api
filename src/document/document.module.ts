import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { DocumentArticle } from './entities/document-article.entity';
import { DocumentArticleTax } from './entities/document-article-tax.entity';
import { DocumentTotal } from './entities/document-total.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Document,
      DocumentArticle,
      DocumentArticleTax,
      DocumentTotal,
    ]),
    CompanyModule,
  ],
  // controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
