import { Component, input, InputSignal, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IComentario } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  imagen_url: InputSignal<string> = input("../../../assets/sin_perfil.png");
  hasLike= signal<boolean> (false);
  mensajeNuevo = new FormControl('', [Validators.required])
  mostrarComentarios: boolean = false;
  titulo: InputSignal<string> = input("Titulo de la Publicacion");
  _id = input<string>("id-ejemplo");
  contenido: InputSignal<string> = input("Aca va al contenido");
  likes: InputSignal<number> = input(0);
  likeActualizado = output<{id: string, nuevoValor: number}>();
  autor: InputSignal<string> = input("UsuarioEjemplo");
  fecha_publicacion: InputSignal<string> = input(new Date().toISOString());
  comentarios: IComentario[] = [
    {nombre: "UsuarioEjemplo", texto: "Este es un comentario de ejemplo.", fecha: this.fecha_publicacion()},
    {nombre: "OtroUsuario", texto: "Otro comentario de ejemplo.", fecha: this.fecha_publicacion()},
    {nombre: "TercerUsuario", texto: "Un tercer comentario de ejemplo.", fecha: this.fecha_publicacion()}
  ];

  get validar(): boolean {
    const mensajeLimpio = this.mensajeNuevo.value?.trim();
    return this.mensajeNuevo.invalid || !mensajeLimpio;
  }

  enviarComentario() {
    console.log('Comentario enviado:', this.mensajeNuevo.value);
    this.mensajeNuevo.reset();
  }

  toggleLike() {
    this.hasLike.update( valor => !valor);
    const nuevoValor = this.hasLike() ? this.likes() + 1 : this.likes() - 1;
    this.likeActualizado.emit({id: this._id(), nuevoValor: nuevoValor});
  }



  toggleComentarios() {
    this.mostrarComentarios = !this.mostrarComentarios;
  }
}
