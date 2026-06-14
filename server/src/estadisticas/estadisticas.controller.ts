import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { JtwGuard } from '@/guards/jtwguard/jtwguard.guard';
import { AdminGuard } from '@/guards/admin/admin.guard';

@Controller('estadisticas')
@UseGuards(JtwGuard, AdminGuard)
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
