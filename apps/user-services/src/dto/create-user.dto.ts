import { IsEmail, IsEnum, IsString } from "class-validator";
import { ValidRoles } from "../interfaces";


export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(ValidRoles)
    role: ValidRoles;

}