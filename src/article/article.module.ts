import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { CompanyModule } from 'src/company/company.module';
import { ArticleTaxEntity } from './entities/article-tax.entity';
import { CategoryModule } from 'src/category/category.module';
import { TaxModule } from 'src/tax/tax.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, ArticleTaxEntity]),
    CompanyModule,
    CategoryModule,
    TaxModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
