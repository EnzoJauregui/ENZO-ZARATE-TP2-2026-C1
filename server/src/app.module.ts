import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { AutenticationModule } from './autentication/autentication.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentariosModule } from './comentarios/comentarios.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ComentariosModule, 
    PublicacionesModule, 
    AutenticationModule, 
    UsuariosModule,
    MongooseModule.forRoot(process.env.MONGO_URI!),
    EstadisticasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
