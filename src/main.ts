import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './config/global.env';
import { SwaggerService } from './swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  new SwaggerService(app).run();

  await app.listen(APP.PORT, APP.HOST);
}
bootstrap();
