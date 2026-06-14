import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { AutenticationModule } from '@/autentication/autentication.module';
import { PublicacionesModule } from '@/publicaciones/publicaciones.module';
import { ComentariosModule } from '@/comentarios/comentarios.module';

@Module({
  imports: [
    AutenticationModule, 
    PublicacionesModule, 
    ComentariosModule,
  ],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}
