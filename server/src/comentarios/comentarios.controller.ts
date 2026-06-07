import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll(
    @Query("id_publicacion") id_publicacion: string, 
    @Query("limit") limit?: string,
    @Query("offset") offset?: string
  ) {
    return this.comentariosService.findAll({ 
      id_publicacion, 
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    return this.comentariosService.update(id, updateComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(+id);
  }
}
