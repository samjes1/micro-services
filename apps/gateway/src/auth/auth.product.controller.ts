import { Controller, Post, Body, UseGuards, Req, Get, Inject, Param, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'apps/product-services/src/dtos/create-product.dto';
import { isUUID } from 'class-validator';

@Controller('products')
export class ProductsController {
  constructor(@Inject('NATS_CLIENT') private readonly natsClient: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Protege la ruta con JWT
  async createProduct(@Body() data: CreateProductDto, @Req() req) {
    // Extrae el userId del token JWT
    const userId = req.user.sub;

    // Envía el mensaje al microservicio de productos via NATS
    return this.natsClient.send('CREATE_PRODUCT', {
      ...data,
      userId, // Añade el userId del usuario autenticado
    });
  }


  @Get(':id') // El ":id" es el userId del usuario
  async getProductsByUser(@Param('id') userId: string) {
    // Valida que el userId sea un UUID
    if (!isUUID(userId)) throw new BadRequestException('ID inválido');
  
    // Envía el mensaje al microservicio de productos via NATS
    return this.natsClient.send('GET_PRODUCTS_BY_USER', userId);
  }



}