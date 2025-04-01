import { Controller, Get } from '@nestjs/common';
import { ProductServicesService } from './product-services.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller()
export class ProductServicesController {
  constructor(private readonly productServicesService: ProductServicesService) {}

  
  @MessagePattern('CREATE_PRODUCT')
  async createProduct(@Payload() data: CreateProductDto) {
    return this.productServicesService.create(data);
  }

  @MessagePattern('GET_PRODUCTS_BY_USER')
  async getProductsByUser(@Payload() userId: string) {
    return this.productServicesService.findByUserId(userId);
  }

  


}
