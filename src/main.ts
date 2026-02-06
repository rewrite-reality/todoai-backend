import 'dotenv/config'; // Load environment variables from .env file

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './app.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await configureApp(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
