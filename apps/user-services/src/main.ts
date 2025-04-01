import { NestFactory } from '@nestjs/core';
import { UserServicesModule } from './user-services.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServicesModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_URL || 'nats://localhost:4222'], // URL de NATS
      },
    },
  );

  await app.listen();
}

bootstrap();
