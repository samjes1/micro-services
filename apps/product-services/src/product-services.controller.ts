import { Controller, Get } from '@nestjs/common';
import { ProductServicesService } from './product-services.service';

@Controller()
export class ProductServicesController {
  constructor(private readonly productServicesService: ProductServicesService) {}

  @Get()
  getHello(): string {
    return this.productServicesService.getHello();
  }
}
