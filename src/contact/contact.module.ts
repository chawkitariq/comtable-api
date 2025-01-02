import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactEntity } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), CompanyModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
