import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserServicesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existUser)
        throw new ConflictException('Emiail ya ha sido registrado');

      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
    
      return 
    } catch (error) {
      this.handleDBErrors(error);
    
    
    
    }


    /* delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    }; */
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
