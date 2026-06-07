import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comentario } from './entities/comentario.entity';
import { Model } from 'mongoose';

@Injectable()
export class ComentariosService {
  constructor(@InjectModel('Comentario') private readonly ComentarioModule: Model<Comentario>){}

  async create(createComentarioDto: CreateComentarioDto) {
    return await this.ComentarioModule.create(createComentarioDto);
  }

  async findAll(query: { id_publicacion: string, limit?: number, offset?: number }) {
    const filtro: any = {dado_de_baja: { $ne: true }}
    if(query.id_publicacion){
      filtro.id_publicacion = query.id_publicacion;
    }
    const baseQuery = this.ComentarioModule.find(filtro).sort({ fecha_creacion: -1 });
    if(query.limit !== undefined) {
      baseQuery.limit(query.limit);
    }
    if(query.offset !== undefined){
      baseQuery.skip(query.offset)
    }
    return await baseQuery.exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  async update(id: string, updateComentarioDto: UpdateComentarioDto) {
    return await this.ComentarioModule.findByIdAndUpdate(id, updateComentarioDto, {returnDocument: "after"});
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
