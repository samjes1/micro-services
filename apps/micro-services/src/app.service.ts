import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/user-services/src/dto/create-user.dto';

@Injectable()
export class AppService {
 constructor(@Inject('CREATE_USER') private clientUser: ClientProxy) {}

 
  getHello(): string {
    return 'ESTOY EN LA APP PRINCIPAL'
  }


  newUser(user: CreateUserDto){
    const mockUser = {

    }
    this.clientUser.emit('new_user', user)
    return 'send_queue'
  }
}
