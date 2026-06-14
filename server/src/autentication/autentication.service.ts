import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Autentication } from './entities/autentication.entity';
import * as bcryptjs from 'bcrypt';
import { sign } from 'jsonwebtoken'

@Injectable()
export class AutenticationService {
  constructor(@InjectModel('Autentication') private readonly AutenticationModel: Model<Autentication>) { }

  async crearUsuario(registroDto: RegistroDto) {
    const user = await this.AutenticationModel.findOne({email: registroDto.email});
    if (user) throw new BadRequestException("El email ya se encuentra registrado.");

    const { password } = registroDto;
    registroDto.password = await bcryptjs.hash(password, 10);
    const usuario = await this.AutenticationModel.create(registroDto);

    return this.crearToken(usuario);
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.AutenticationModel.findOne({ email:loginDto.email });
    if (!usuario) throw new UnauthorizedException('Email invalido');

    const validarPassword = await bcryptjs.compare(loginDto.password, usuario.password)
    if (!validarPassword) throw new UnauthorizedException('Contraseña invalida');

    if(usuario.fecha_baja == true) throw new ForbiddenException("Tu cuenta ha sido dada de baja");

    usuario.password = loginDto.password;
    return this.crearToken(usuario);
  }

  async obtenerUsuarioPorEmail(email: string){
    const usuario = await this.AutenticationModel.findOne({ email });
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
    return usuario;
  }

  async refrescarToken(email: string){
    const usuario = await this.AutenticationModel.findOne({ email });
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    return this.crearToken(usuario);
  }

  crearToken(usuario: any) {
    const payload = {
      _id: usuario._id,
      email: usuario.email,
      perfil: usuario.perfil,
    };
    const token: string = sign(payload, "ASLAMDS78789uadnasac@@asc", {
      algorithm: 'HS256',
      audience: 'registro',
      expiresIn: '20m',
    });
    return { token, usuario };
  }

  async traerTodos() {
    const todos = await this.AutenticationModel.find();
    return todos;
  }
}
