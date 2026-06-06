import { Component, input, InputSignal, signal } from '@angular/core';
import { IComentario } from '../../pages/publicacion/comentarios.interface';

@Component({
  selector: 'app-comentario',
  imports: [],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css',
})
export class Comentario {
  mostrarComentarios: boolean = false;
  comentario: InputSignal<IComentario> = input({} as IComentario)
}
