import { Module } from '@nestjs/common';
import { ProductServicesController } from './product-services.controller';
import { ProductServicesService } from './product-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Product],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductServicesController],
  providers: [ProductServicesService],
  exports: [ProductServicesService]
})
export class ProductServicesModule {}
