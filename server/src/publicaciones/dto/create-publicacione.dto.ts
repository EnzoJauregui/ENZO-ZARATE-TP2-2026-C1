import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from "class-validator";

export class CreatePublicacioneDto {
    @IsOptional()
    @IsString()
    _id: string;
    
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

    @IsArray()
    @IsString({ each: true })
    likes_usuarios: string[];

    @IsOptional()
    imagen_url: string;

    @IsOptional()
    @IsString()
    fecha_baja: string;
}
