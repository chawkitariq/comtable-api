import { Module } from '@nestjs/common';
import { CurrenyService } from './curreny.service';
import { CurrenyController } from './curreny.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curreny } from './entities/curreny.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curreny])],
  controllers: [CurrenyController],
  providers: [CurrenyService],
})
export class CurrenyModule {}
