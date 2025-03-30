import { NestFactory } from '@nestjs/core';
import { ProductServicesModule } from './product-services.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductServicesModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
