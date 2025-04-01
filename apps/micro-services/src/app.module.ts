import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'apps/gateway/src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'CREATE_USER', transport: Transport.NATS },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
