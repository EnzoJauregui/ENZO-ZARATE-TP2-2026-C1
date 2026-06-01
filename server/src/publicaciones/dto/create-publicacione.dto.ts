import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePublicacioneDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    contenido: string;

    @IsString()
    @IsNotEmpty()
    email_autor: string;

    @IsString()
    @IsNotEmpty()
    fecha_publicacion: string;

    @IsNumber()
    @IsNotEmpty()
    likes: number;

    @IsOptional()
    imagen_url: string;

    @IsOptional()
    @IsString()
    fecha_baja: string;
}
