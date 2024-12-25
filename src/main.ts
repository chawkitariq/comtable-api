import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.APP_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Comtable Api')
      .setDescription('The comtable Api documentation')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
