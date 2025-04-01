import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://localhost:4222'],
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
