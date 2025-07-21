import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global.exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation.exception.filter';
import { IsRequestFromEgyptGuard } from './common/guards/IsRequestFromEgypt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  // Allow only requests from Egypt
  app.useGlobalGuards(new IsRequestFromEgyptGuard());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port') as number;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
