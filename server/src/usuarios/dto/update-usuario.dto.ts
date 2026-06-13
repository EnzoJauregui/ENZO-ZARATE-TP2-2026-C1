import { IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
    @IsBoolean()
    fecha_baja: boolean
}
