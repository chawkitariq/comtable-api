import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { DocumentController } from './document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity]), CompanyModule],
  // controllers: [DocumentController],
  providers: [DocumentService, DocumentController],
  exports: [DocumentService, DocumentController],
})
export class DocumentModule {}
