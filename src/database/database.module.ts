import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource from './datasource';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(datasource.options)],
})
export class DatabaseModule {}
