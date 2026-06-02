import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacioneDto } from './create-publicacione.dto';
import { IsNumber, IsOptional, IsDateString, IsString, IsArray } from 'class-validator';

export class UpdatePublicacioneDto extends PartialType(CreatePublicacioneDto) {
    @IsOptional()
    @IsNumber()
    likes: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })   
    likes_usuarios: string[];

    @IsOptional()
    @IsDateString()
    fecha_baja: string;
}
