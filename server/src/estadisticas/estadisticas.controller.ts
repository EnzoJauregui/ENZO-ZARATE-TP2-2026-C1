import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { JwtGuard } from '@/guards/jwtguard/jwt.guard';
import { AdminGuard } from '@/guards/admin/admin.guard';

@Controller('estadisticas')
@UseGuards(JwtGuard, AdminGuard)
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get('/comentarios')
  traerComentarios() {
    return this.estadisticasService.traerComentarios();
  }

  @Get('/publicaciones')
  traerPublicaciones() {
    return this.estadisticasService.traerPublicaciones();
  }

  @Get('/usuarios')
  traerUsuarios(){
    return this.estadisticasService.traerUsuarios();
  }
}
