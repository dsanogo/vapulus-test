import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from "src/config/app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder().setTitle('Vapulus Backend API')
                                      .setDescription("Vapulus Backend Test API")
                                      .setVersion('1.0.0')
                                      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(config.apiLink, app, document);

  await app.listen(3000);
}
bootstrap();
