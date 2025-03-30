import { Controller, Get } from '@nestjs/common';
import { UserServicesService } from './user-services.service';

@Controller()
export class UserServicesController {
  constructor(private readonly userServicesService: UserServicesService) {}

  @Get()
  getHello(): string {
    return this.userServicesService.getHello();
  }
}
