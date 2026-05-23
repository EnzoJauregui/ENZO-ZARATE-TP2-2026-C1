import { Controller, Post, Body } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';


@Controller('autentication')
export class AutenticationController {
  constructor(private readonly autenticationService: AutenticationService) {}

  @Post('/registro')
  create(@Body() registroDto: RegistroDto) {
    return this.autenticationService.crearUsuario(registroDto);
  }

  @Post('/login')
  verificarUsuario(@Body() loginDto: LoginDto) {
    return this.autenticationService.validarUsuario(loginDto);
  }
}
