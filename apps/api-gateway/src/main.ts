import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { test } from '@delivery/common/test';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
