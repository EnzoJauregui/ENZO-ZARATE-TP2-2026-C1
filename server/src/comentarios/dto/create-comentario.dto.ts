import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateComentarioDto {
    @IsString()
    @IsNotEmpty()
    id_autor: string;

    @IsString()
    @IsNotEmpty()
    id_publicacion: string;

    @IsString()
    @IsNotEmpty()
    contenido: string;

    @IsEmail()
    email_autor: string;

    @IsBoolean()
    @IsOptional()
    fue_editado: boolean;

    @IsString()
    @IsNotEmpty()
    fecha_creacion: string;

    @IsBoolean()
    @IsOptional()
    dado_de_baja: boolean;
}
