import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductServicesService {
  getHello(): string {
    return 'Hola soy el servicio de products';
  }
}
