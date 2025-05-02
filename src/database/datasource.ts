import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { isProduction } from 'src/app.constant';
import { DataSource } from 'typeorm';

ConfigModule.forRoot();

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/**/*.{ts,js}')],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default datasource;
