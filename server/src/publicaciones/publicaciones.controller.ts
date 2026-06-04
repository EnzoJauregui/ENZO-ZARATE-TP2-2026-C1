import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Post()
  create(@Body() createPublicacioneDto: CreatePublicacioneDto) {
    return this.publicacionesService.create(createPublicacioneDto);
  }

  @Get()
  findAll(
    @Query('orden') orden?: 'fecha' | 'likes',
    @Query('id_autor') id_autor?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.publicacionesService.findAll({
      orden: orden || 'fecha',
      id_autor,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacioneDto: UpdatePublicacioneDto) {
    return this.publicacionesService.update(id, updatePublicacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(id);
  }
}
