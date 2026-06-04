import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsBoolean } from "class-validator";

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
    id_autor: string;

    @IsString()
    @IsNotEmpty()
    fecha_publicacion: string;

    @IsNumber()
    @IsNotEmpty()
    likes: number;

    @IsArray()
    likes_usuarios: string[];

    @IsOptional()
    imagen_url: string;

    @IsOptional()
    @IsBoolean()
    fecha_baja: boolean;
}
