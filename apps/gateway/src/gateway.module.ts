import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, ClientsModule.register([
    {
      name: 'NATS_CLIENT',
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_URL || 'nats://localhost:4222']
      }
    }
  ])],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
