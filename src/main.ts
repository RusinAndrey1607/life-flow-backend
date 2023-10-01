import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { ValidationPipe } from './pipes/validation.pipe';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Life Flow')
    .setDescription('Documentation for LifeFlow Rest Api')
    .setVersion('1.0.0')
    .addTag('Andrey')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => {
    console.log('Server working on port', PORT);
  });
};

start()
