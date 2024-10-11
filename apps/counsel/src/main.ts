import { NestFactory } from '@nestjs/core';
import { CounselModule } from './counsel.module';

async function bootstrap() {
  const app = await NestFactory.create(CounselModule);
  await app.listen(3000);
}
bootstrap();
