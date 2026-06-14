import { Controller, Post, Body, Req, Res, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JwtGuard } from '@/guards/jwtguard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: "demgu3xd1",
  api_key: "174364694334533",
  api_secret: "0reoMAsFjSYPP71pzT0IyX3buN4",
});

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
      expires: new Date(Date.now() + 1000*60*15)
    });
    return usuario
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('imagen_url', {
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        public_id: (req, file) => `IMG_${Date.now()}_archivos`,
      },
    }),
  }), )
  async subirArchivo(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    return file.path;
  }

  @Post('/login')
  async verificarUsuario(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const {token, usuario} = await this.autenticationService.login(loginDto);
    response.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: 'strict',
      //secure: true,
      expires: new Date(Date.now() + 1000*50)
    });
    return usuario
  }

  @UseGuards(JwtGuard)
  @Post("/refresh")
  async refrescarToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const userToken = request["usuario"] as {email: string; perfil: string};
    const {token, usuario} = await this.autenticationService.refrescarToken(userToken.email);
    response.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: 'strict',
      //secure: true,
      expires: new Date(Date.now() + 1000*40)
    });
    return usuario
  }
 
  @UseGuards(JwtGuard)
  @Post('/autorizar')
  async autorizarUsuario(
    @Req() request: Request
  ) {
    const userToken = request["usuario"] as {email: string; peril: string}
    const usuario = await this.autenticationService.obtenerUsuarioPorEmail(userToken.email);
    return {
      valido: true,
      usuario
    };
  }
}
