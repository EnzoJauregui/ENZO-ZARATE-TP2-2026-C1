import { Component, inject, input, InputSignal, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IComentario } from '../../pages/publicacion/comentario.id.interface';
import { ComentariosService } from '../../services/comentarios.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentario',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css',
})
export class Comentario {
  comentatioService = inject(ComentariosService);

  user_id: InputSignal<string> = input("");
  mostrarComentarios: boolean = false;
  editarComentario: boolean = false;
  comentarioNuevo = new FormControl("", [Validators.required])
  comentario: InputSignal<IComentario> = input({} as IComentario)
  comentarioEditado = output<void>();
 
  get esElAutor(): boolean{
    return this.comentario().id_autor === this.user_id();
  }

  get hayUsuario(): boolean{
    return this.user_id() !== "";
  }

  get validar(): boolean {
    const mensajeLimpio = this.comentarioNuevo.value?.trim();
    return this.comentarioNuevo.invalid || !mensajeLimpio;
  }

  editarMensaje(){
    if(this.hayUsuario){
      this.editarComentario = true;
    }
  }

  cancelarEdicion(){
    this.comentarioNuevo.reset();
    this.editarComentario = false;
  }

  confirmarEdicion(){
    if(this.hayUsuario && !this.validar && this.comentarioNuevo.value){
      this.comentatioService.editarComentario(
        this.comentario()._id, this.comentarioNuevo.value, 
        () => this.comentarioEditado.emit()
      );
      this.cancelarEdicion();
    } 
  }
}
