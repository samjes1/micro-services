import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'apps/gateway/src/auth/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header "Authorization"
      secretOrKey: process.env.JWT_SECRET || 'JWT_SECRET', // Clave secreta para verificar la firma
      ignoreExpiration: false, // No ignora la expiración del token
    });
  }

  // Método para validar el payload del token
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload.id); // Busca al usuario por ID
    if (!user) {
      throw new UnauthorizedException('Token inválido o usuario no existe');
    }
    return user; // El usuario se adjunta a la solicitud (req.user)
  }
}