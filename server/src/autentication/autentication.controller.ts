import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { CreateAutenticationDto } from './dto/create-autentication.dto';
import { UpdateAutenticationDto } from './dto/update-autentication.dto';

@Controller('autentication')
export class AutenticationController {
  constructor(private readonly autenticationService: AutenticationService) {}

  @Post()
  create(@Body() createAutenticationDto: CreateAutenticationDto) {
    return this.autenticationService.create(createAutenticationDto);
  }

  @Get()
  findAll() {
    return this.autenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autenticationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutenticationDto: UpdateAutenticationDto) {
    return this.autenticationService.update(+id, updateAutenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autenticationService.remove(+id);
  }
}
