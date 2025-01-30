import { Module } from '@nestjs/common';
import { DocumentArticleTaxEntity } from './entities/document-article-tax.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentArticleTaxEntity])],
})
export class DocumentArticleTaxModule {}
