import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServicesService {
  getHello(): string {
    return 'Hello World!';
  }
}
