import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacioneDto } from './create-publicacione.dto';
import { IsNumber, IsOptional, IsDateString, IsString, IsArray, IsBoolean } from 'class-validator';

export class UpdatePublicacioneDto extends PartialType(CreatePublicacioneDto) {
    @IsOptional()
    @IsNumber()
    likes: number;

    @IsOptional()
    @IsArray()
    likes_usuarios: string[];

    @IsOptional()
    @IsBoolean()
    fecha_baja: boolean;
}
