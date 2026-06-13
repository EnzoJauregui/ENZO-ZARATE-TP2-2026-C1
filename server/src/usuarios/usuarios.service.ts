import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Autentication } from '@/autentication/entities/autentication.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel('Autentication') private readonly AutenticationModel: Model<Autentication>
  ){}

  async findAll() {
    return this.AutenticationModel.find();
  }

  async cambiarEstado(id: string, updateUsuarioDto: UpdateUsuarioDto){
    return this.AutenticationModel.findByIdAndUpdate(id, updateUsuarioDto, { returnDocument: "after" });
  }
}
