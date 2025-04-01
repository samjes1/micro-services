import { Module } from '@nestjs/common';
import { UserServicesController } from './user-services.controller';
import { UserServicesService } from './user-services.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,   TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'), 
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserServicesController],
  providers: [UserServicesService],
  exports: [UserServicesService],
})
export class UserServicesModule {}
