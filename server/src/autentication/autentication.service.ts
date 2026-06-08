import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Autentication } from './entities/autentication.entity';
import * as bcryptjs from 'bcrypt';
import { sign, decode, verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

@Injectable()
export class AutenticationService {
  constructor(@InjectModel('Autentication') private readonly AutenticationModel: Model<Autentication>) { }

  async crearUsuario(registroDto: RegistroDto) {
    const user = await this.AutenticationModel.findOne({email: registroDto.email});
    if (user) throw new BadRequestException("El email ya se encuentra registrado.");

    const { password } = registroDto;
    registroDto.password = await bcryptjs.hash(password, 10);
    const usuario = await this.AutenticationModel.create(registroDto);
    console.log(usuario);

    return this.crearToken(usuario);
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.AutenticationModel.findOne({ email:loginDto.email });
    if (!usuario) throw new UnauthorizedException('Email invalido');

    const validarPassword = await bcryptjs.compare(loginDto.password, usuario.password)
    if (!validarPassword) throw new UnauthorizedException('Contraseña invalida');

    usuario.password = loginDto.password;
    return this.crearToken(usuario);
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
    const token: string = sign(payload, process.env.CLAVE_SECRETA!, {
      algorithm: 'HS256',
      audience: 'registro',
      expiresIn: '15m',
    });
    return { token, usuario };
  }

  // verificar(authHeader: string) {
  //   if(!authHeader) throw new BadRequestException('Falta el encabezado de autorizaacion')

  //   const [tipo, token] = authHeader.split(" ");

  //   if(tipo !== "Bearer" || !token) throw new BadRequestException("El formato de autorizacion del token debe ser Bearer");
  //   try{
  //     const tokenValidado = verify(token,  process.env.CLAVE_SECRETA!)
  //     return tokenValidado;
  //   } catch(error){
  //     if(error instanceof TokenExpiredError) throw new UnauthorizedException('El token ha expirado');
  //     if(error instanceof JsonWebTokenError) throw new UnauthorizedException("Token invalido o fallo en la firma");
      
  //     throw new InternalServerErrorException("Error interno al verificar el token");
  //   }
  // }

  // guardarEnCookie(userData: LoginDto) {
  //   const payload = {
  //     sub: userData.email,
  //     email: userData.email,
  //   };
  //   const token: string = sign(payload, process.env.CLAVE_SECRETA!, {
  //     algorithm: 'HS256',
  //     audience: 'registro',
  //     expiresIn: '15m',
  //   });
  //   return { token: token };
  // }

  // verificarDesdeCookie(token: string){
  //   try{
  //     const tokenValidado = verify(token,  process.env.CLAVE_SECRETA!)
  //     return tokenValidado;
  //   } catch(error){
  //     if(error instanceof TokenExpiredError) throw new UnauthorizedException('El token ha expirado');
  //     if(error instanceof JsonWebTokenError) throw new UnauthorizedException("Token invalido o fallo en la firma");
      
  //     throw new InternalServerErrorException("Error interno al verificar el token");
  //   }
  // }

  async traerTodos() {
    const todos = await this.AutenticationModel.find();
    return todos;
  }
  
  remove(id: number) {
    return `This action removes a #${id} autentication`;
  }
}
