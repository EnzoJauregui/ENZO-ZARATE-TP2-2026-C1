import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JtwGuard } from '@/guards/jtwguard/jtwguard.guard';
import { AdminGuard } from '@/guards/admin/admin.guard';

@Controller('usuarios')
@UseGuards(JtwGuard, AdminGuard)
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
