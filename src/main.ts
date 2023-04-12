import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Short'n'Sweet")
    .setDescription("Descricao da API da Short'n'Sweet")
    .setVersion("1.0")
    .addTag("shortnsweet")
    .build(); 

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); 

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true 
  }));
  await app.listen(3000);
}
bootstrap();
