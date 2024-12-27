import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentArticleTax } from './entities/document-article-tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentArticleTax])],
})
export class DocumentArticleTaxModule {}
