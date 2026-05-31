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

  async findAll() {
    return await this.PublicacionesModel.find();
  }

  async findOne(id: string) {
    return await this.PublicacionesModel.findById(id);
  }

  async update(id: string, updatePublicacioneDto: UpdatePublicacioneDto) {
    return await this.PublicacionesModel.findByIdAndUpdate(id, updatePublicacioneDto, { new: true });
  }

  async remove(id: string) {
    return await this.PublicacionesModel.findByIdAndDelete(id);
  }
}
