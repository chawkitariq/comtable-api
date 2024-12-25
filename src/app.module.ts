import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [DatabaseModule, UserModule, SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
