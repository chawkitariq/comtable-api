import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { EnabledCompanyGuard } from './guards/enabled-company.guard';
import { CompanyAuthenticationLoginedListener } from './listeners/company-authentication-logined.listener';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    EnabledCompanyGuard,
    CompanyAuthenticationLoginedListener,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
