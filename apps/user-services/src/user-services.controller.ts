import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserServicesService } from './user-services.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserServicesController {
  constructor(private readonly userServicesService: UserServicesService) {}



    @MessagePattern('CREATE_USER')
  async createUser(@Payload() data: CreateUserDto) { // <-- Payload validado
    return this.userServicesService.create(data);
  }

  // Endpoint para buscar un usuario por ID
  @MessagePattern('FIND_USER_BY_ID')
  async findUserById(@Payload() userId: string) { // <-- Payload es el ID
    return this.userServicesService.findById(userId);
  }
}
    

  
