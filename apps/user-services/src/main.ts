import { NestFactory } from '@nestjs/core';
import { UserServicesModule } from './user-services.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServicesModule);
  await app.listen(process.env.port ?? 3003);
}
bootstrap();
