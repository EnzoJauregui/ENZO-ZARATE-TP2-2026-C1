import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class RegistroDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    apellido!: string;

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @IsString()
    @IsNotEmpty()
    perfil!: string;

    imagen?: string;
}
