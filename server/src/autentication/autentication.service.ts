import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Autentication } from './entities/autentication.entity';
import * as bcriptjs from 'bcrypt';
import { todo } from 'node:test';

@Injectable()
export class AutenticationService {
  constructor(@InjectModel('Autentication') private readonly AutenticationModel: Model<Autentication>){}
  
  async crearUsuario(registroDto: RegistroDto) {
    const user = await this.findOne(registroDto.email);
    if(user) throw new BadRequestException;

    const { password } = registroDto;
    registroDto.password = await bcriptjs.hash(password, 10);
    const usuario = await this.AutenticationModel.create(registroDto);
    console.log(usuario);
    return usuario;
    
  }

  async login(loginDto: LoginDto){
    const usuario = await this.findOne(loginDto.email);
    if(!usuario) throw new UnauthorizedException('Email invalido');

    const validarPassword = await bcriptjs.compare(loginDto.password, usuario.password)
    if(!validarPassword) throw new UnauthorizedException('Contraseña invalida');

    usuario.password = loginDto.password;
    return usuario;
  }
  async findOne(email: string) {
    const usuario = await this.AutenticationModel.findOne( {email: email})
    return usuario;
  }

  async traerTodos(){
    const todos = await this.AutenticationModel.find();
    return todos;

  }

  remove(id: number) {
    return `This action removes a #${id} autentication`;
  }
}
