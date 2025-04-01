import { IsString, IsPositive, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsUUID()
  userId: string; // TODO: Validar que sea un UUID válido
}