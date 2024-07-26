import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: ['http://localhost:3100'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     optionsSuccessStatus: 201,
//     credentials: true
// });

app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3100);
}
bootstrap();
