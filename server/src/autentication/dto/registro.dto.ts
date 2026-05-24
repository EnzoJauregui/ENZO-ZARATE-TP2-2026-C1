import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength } from "class-validator";

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
    @MinLength(8)
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

    @IsString()
    fecha_nacimiento!: string

    @IsOptional()
    imagen?: string;
}
