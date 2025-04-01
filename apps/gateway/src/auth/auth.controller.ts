import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Inject,
  BadRequestException,
  Param,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from 'apps/product-services/src/dtos/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { isUUID } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('product')
  @UseGuards(AuthGuard('jwt')) // Protege la ruta con JWT
  async createProduct(@Body() data: CreateProductDto, @Req() req) {
    // Extrae el userId del token JWT
    const userId = req.user.id;

    // Envía el mensaje al microservicio de productos via NATS
    return this.natsClient.send('CREATE_PRODUCT', {
      ...data,
      userId, // Añade el userId del usuario autenticado
    });
  }

  @Get(':id') // El ":id" es el userId del usuario
  async getProductsByUser(@Param('id') userId: string) {
    // Valida que el userId sea un UUID (opcional)
    if (!isUUID(userId)) throw new BadRequestException('ID inválido');

    // Envía el mensaje al microservicio de productos via NATS
    return this.natsClient.send('GET_PRODUCTS_BY_USER', userId);
  }
}
