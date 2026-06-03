import { Component, input, InputSignal, signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IComentario } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { IPublicacion } from '../../pages/publicaciones/publicacion.interface';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  pubService = inject(PublicacionService);

  publicacion: InputSignal<IPublicacion> = input({} as IPublicacion);
  hasLike= signal<boolean> (false);
  mensajeNuevo = new FormControl('', [Validators.required])
  mostrarComentarios: boolean = false;
  id_usuario_like = input<string>("");
  likes_usuarios= signal<string[]>([]);
  hayUsuario = signal<boolean>(false);
  likes = signal<number>(0);
  comentarios: IComentario[] = [
    {nombre: "UsuarioEjemplo", texto: "Este es un comentario de ejemplo.", fecha: new Date().toISOString()},
    {nombre: "OtroUsuario", texto: "Otro comentario de ejemplo.", fecha: new Date().toISOString()},
    {nombre: "TercerUsuario", texto: "Un tercer comentario de ejemplo.", fecha: new Date().toISOString()}
  ];

  ngOnInit() {
    this.likes.set(this.publicacion().likes || 0);
    
    const likesActuales = this.publicacion().likes_usuarios || [];
    this.likes_usuarios.set(likesActuales);

    if (this.id_usuario_like() && this.id_usuario_like() !== "") {
      this.hayUsuario.set(true);
      this.hasLike.set(likesActuales.includes(this.id_usuario_like()));
    } else {
      this.hasLike.set(false);
    }
  }

  get validar(): boolean {
    const mensajeLimpio = this.mensajeNuevo.value?.trim();
    return this.mensajeNuevo.invalid || !mensajeLimpio;
  }

  enviarComentario() {
    console.log('Comentario enviado:', this.mensajeNuevo.value);
    this.mensajeNuevo.reset();
  }

  toggleLike() {
    if (!this.id_usuario_like() || this.id_usuario_like() === "") {
      console.warn("Debes iniciar sesión para dar like");
      return; 
    }
    
    const tieneLike: boolean = this.likes_usuarios().includes(this.id_usuario_like());
    if(tieneLike){
      this.likes_usuarios.update(
        likes => likes.filter(id => id !==this.id_usuario_like())
      );
      this.hasLike.set(false);
      this.likes.update(likes => likes - 1);
    } else {
      this.likes_usuarios.update(
        likes => [ ...likes, this.id_usuario_like() ]
      );
      this.hasLike.set(true);
      this.likes.update(likes => likes + 1);
    }
    this.pubService.cambiarLikes(this.publicacion()._id, this.likes_usuarios().length, this.likes_usuarios());
  }
  
  eliminarPublicacion(){
    if(this.publicacion().email_autor){

    }
  }

  toggleComentarios() {
    this.mostrarComentarios = !this.mostrarComentarios;
  }

}
