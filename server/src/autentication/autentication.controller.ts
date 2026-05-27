import { Controller, Post, Body, Get, Res, UseGuards } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JtwGuard } from '@/guards/jtwguard/jtwguard.guard';



@Controller('autentication')
export class AutenticationController {
  constructor(private readonly autenticationService: AutenticationService) {}

  @Post('/registro')
  async create(@Body() registroDto: RegistroDto, @Res({ passthrough: true }) response: Response) {
    const {token, usuario} = await this.autenticationService.crearUsuario(registroDto);
    response.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: 'strict',
      //secure: true,
      expires: new Date(Date.now() + 1000*15)
    });
    return usuario
  }

  @Post('/login')
  async verificarUsuario(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const {token, usuario} = await this.autenticationService.login(loginDto);
    response.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: 'strict',
      //secure: true,
      expires: new Date(Date.now() + 1000*60*15)
    });
    return usuario
  }

  @Get()
  traerUsuarios(){
    return this.autenticationService.traerTodos();
  }
 
  @UseGuards(JtwGuard)
  @Get("data/jwt")
  traerConGuard(@Body('emailDelToken') email: any){
    console.log(email);
    return {message: "Acceso otorgado a "+email}
  }
}
