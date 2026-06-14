import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtGuard } from '@/guards/jwtguard/jwt.guard';
import { AdminGuard } from '@/guards/admin/admin.guard';

@Controller('usuarios')
@UseGuards(JwtGuard, AdminGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.cambiarEstado(id, updateUsuarioDto);
  }
}
