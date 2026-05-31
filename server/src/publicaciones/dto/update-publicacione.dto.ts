import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacioneDto } from './create-publicacione.dto';
import { IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdatePublicacioneDto extends PartialType(CreatePublicacioneDto) {
    @IsOptional()
    @IsNumber()
    likes: number;

    @IsOptional()
    @IsDateString()
    fecha_baja: string;
}
