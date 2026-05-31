import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from "class-validator";

export class CreatePublicacioneDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    contenido: string;

    @IsString()
    @IsNotEmpty()
    id_autor: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_publicacion: string;

    @IsNumber()
    @IsNotEmpty()
    likes: number;

    @IsOptional()
    imagen_Url: string;

    @IsOptional()
    @IsDateString()
    fecha_baja: string;
}
