import { NestFactory } from '@nestjs/core';
import { AppModule } from '@exmpl/app.module';
import logger from '@exmpl/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    logger.debug('teste');
    logger.info(`Listening on PORT: ${PORT}`);
  });
}
bootstrap();
