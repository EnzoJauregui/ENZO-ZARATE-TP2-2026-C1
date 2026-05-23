import { Injectable } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticationService {
  crearUsuario(registroDto: RegistroDto) {
    return 'This action adds a new autentication';
  }

  validarUsuario(loginDto: LoginDto){
    return "Hay que validar";
  }

  findAll() {
    return `This action returns all autentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autentication`;
  }



  remove(id: number) {
    return `This action removes a #${id} autentication`;
  }
}
