import { Injectable } from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publicaciones } from './entities/publicacione.entity';
import { Model } from 'mongoose';

@Injectable()
export class PublicacionesService {
  constructor(@InjectModel("Publicaciones") private readonly PublicacionesModel: Model<Publicaciones>) {}

  async create(createPublicacioneDto: CreatePublicacioneDto) {
    const nuevaPublicacion = await this.PublicacionesModel.create(createPublicacioneDto);
    return nuevaPublicacion;
  }

  async findAll(query: { 
    orden: "fecha" | "likes"; 
    id_autor?: string; 
    limit?: number; 
    offset?: number }) {
    const filtro: any = { fecha_baja: { $ne: true } };

    if (query.id_autor) {
      filtro.id_autor = query.id_autor; 
    }
    let opcionesParaOrdenar = {}
    if(query.orden === "fecha") {
      opcionesParaOrdenar = { fecha_publicacion: -1 };
    } else if (query.orden === "likes") {
      opcionesParaOrdenar = { likes: -1 };
    }
    const baseQuery = this.PublicacionesModel.find(filtro).sort(opcionesParaOrdenar);

    if (query.offset !== undefined) {
      baseQuery.skip(query.offset);
    }
    if (query.limit !== undefined) {
      baseQuery.limit(query.limit);
    }

    return await baseQuery.exec();
  }

  async findOne(id: string) {
    return await this.PublicacionesModel.findById(id);
  }

  async update(id: string, updatePublicacioneDto: UpdatePublicacioneDto) {
    return await this.PublicacionesModel.findByIdAndUpdate(id, updatePublicacioneDto, { returnDocument: 'after' });
  }

  async remove(id: string) {
    return await this.PublicacionesModel.findByIdAndDelete(id);
  }
}
