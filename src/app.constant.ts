import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot()

export const isProduction = process.env.APP_ENV === 'production';
export const isDevelopment = process.env.APP_ENV === 'development';
