import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { TaxModule } from './tax/tax.module';
import { CompanyModule } from './company/company.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [DatabaseModule, UserModule, SettingModule, TaxModule, CompanyModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
