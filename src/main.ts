import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { Logger } from '/@/util/logger';
import { Config } from '/@/config';
import { isExistOrCreate } from '/@/util/file';
async function bootstrap() {
  isExistOrCreate(Config.cacheRoot);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const limit = '2000mb';
  app.use(express.urlencoded({ limit: limit, extended: false }));
  app.use(express.json({ limit: limit }));
  app.setGlobalPrefix('/api');
  await app.listen(9000);
  Logger.log(`9000`, 'INIT');
}
bootstrap();
