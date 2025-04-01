import { ValidRoles } from 'apps/user-services/src/interfaces';
import { IsEmail, IsString, IsEnum } from 'class-validator';


export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ValidRoles)
  role: ValidRoles;
}