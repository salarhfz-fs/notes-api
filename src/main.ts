import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.use(cookieSession({
    keys: [process.env.COOKIE_SECRET],
  }));
  await app.listen(4000);
}
bootstrap();
