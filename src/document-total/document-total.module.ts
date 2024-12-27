import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTotal } from './entities/document-total.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTotal])],
})
export class DocumentTotalModule {}
