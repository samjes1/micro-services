import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductServicesService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject('FIND_USER_BY_ID') 
    private readonly natsClient: ClientProxy, 
  ){}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const userExists = await this.natsClient
    .send('FIND_USER_BY_ID', createProductDto.userId)
    .toPromise();

    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findByUserId(userId: string): Promise<Product[]> {
    return this.productRepository.find({ where: { userId } });
  }









  }



