import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { DocumentArticleEntity } from './entities/document-article.entity';
import { DocumentArticleTaxEntity } from './entities/document-article-tax.entity';
import { DocumentTotal } from './entities/document-total.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentEntity,
      DocumentArticleEntity,
      DocumentArticleTaxEntity,
      DocumentTotal,
    ]),
    CompanyModule,
  ],
  // controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
