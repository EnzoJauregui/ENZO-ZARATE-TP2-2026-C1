import { Injectable } from '@nestjs/common';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Autentication } from '@/autentication/entities/autentication.entity';
import { Publicaciones } from '@/publicaciones/entities/publicacione.entity';
import { Comentario } from '@/comentarios/entities/comentario.entity';

@Injectable()
export class EstadisticasService {
   constructor(
      @InjectModel('Autentication') private readonly AutenticationModel: Model<Autentication>,
      @InjectModel('Publicaciones') private readonly PublicacionesModel: Model<Publicaciones>,
      @InjectModel('Comentario') private readonly ComentariosModel: Model<Comentario>,
    ){}
  
    async traerComentarios(){
      return this.ComentariosModel.find();
    }

    async traerPublicaciones(){
      return this.PublicacionesModel.find();
    }

    async traerUsuarios(){
      this.AutenticationModel.find();
    }
}
