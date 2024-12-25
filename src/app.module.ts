import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [DatabaseModule, UserModule, SettingModule, TaxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
