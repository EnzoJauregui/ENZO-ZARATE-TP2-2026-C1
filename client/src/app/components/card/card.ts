import { Component, input, InputSignal } from '@angular/core';
import { IComentario } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  imagenUrl: InputSignal<string> = input("../../../assets/sin_perfil.png");
  hasLike: boolean = false;
  mensajeNuevo = new FormControl('', [Validators.required])
  mostrarComentarios: boolean = false;
  titulo: InputSignal<string> = input("Titulo de la Publicacion");
  contenido: InputSignal<string> = input("Aca va al contenido");
  likes: InputSignal<number> = input(10);
  fechaPublicacion: InputSignal<string> = input(new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }));
  comentarios: IComentario[] = [
    {nombre: "UsuarioEjemplo", texto: "Este es un comentario de ejemplo.", fecha: this.fechaPublicacion()},
    {nombre: "OtroUsuario", texto: "Otro comentario de ejemplo.", fecha: this.fechaPublicacion()},
    {nombre: "TercerUsuario", texto: "Un tercer comentario de ejemplo.", fecha: this.fechaPublicacion()}
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
    this.hasLike = !this.hasLike;
  }

  toggleComentarios() {
    this.mostrarComentarios = !this.mostrarComentarios;
  }
}
