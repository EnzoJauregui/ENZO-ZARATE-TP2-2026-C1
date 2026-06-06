import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
    @IsString()
    @IsNotEmpty()
    contenido: string;

    @IsBoolean()
    @IsOptional()
    fue_editado: boolean;
    
    @IsBoolean()
    @IsOptional()
    fecha_baja: boolean;
}
