import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import express from 'express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //them phan nay cho static file
  // import express from 'express';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // app.useStaticAssets(join(__dirname, '../uploads'));
  app.useStaticAssets(join(__dirname, '..', '../uploads'));
  // console.log ()

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // });
  await app.listen(5000);
}
bootstrap();
