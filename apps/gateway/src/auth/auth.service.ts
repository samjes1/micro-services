import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from 'apps/user-services/src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('CREATE_USER') private readonly natsClient: ClientProxy, // Cliente NATS
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    // Envía mensaje a users-service para crear el usuario
    const user = await this.natsClient
      .send('CREATE_USER', registerUserDto)
      .toPromise();

    // Genera JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId } 
    });
    return user || null;

    
}

async login(loginUserDto: LoginUserDto) {
    // TODO: realizar logica de login  
  }
}