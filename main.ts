import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { join  } from 'path';
import * as express from 'express'
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('E-Cart')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build()
    ;




  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  app.useStaticAssets(join(__dirname,'..', 'upload'));
  await app.listen(3000);



}
bootstrap();
