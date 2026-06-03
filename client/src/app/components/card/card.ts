import { Component, input, InputSignal, signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IComentario } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { IPublicacion } from '../../pages/publicaciones/publicacion.interface';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule, DatePipe, Modal],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  pubService = inject(PublicacionService);

  publicacion: InputSignal<IPublicacion> = input({} as IPublicacion);
  hasLike= signal<boolean> (false);
  mensajeNuevo = new FormControl('', [Validators.required])
  mostrarComentarios: boolean = false;
  usuario_perfil: InputSignal<string> = input("usuario");
  usuario_email: InputSignal<string> = input("email");
  id_usuario_like = input<string>("");
  likes_usuarios= signal<string[]>([]);
  hayUsuario = signal<boolean>(false);
  likes = signal<number>(0);
  mostrarModal = signal<boolean>(false);
  tituloModal = signal<string>('');
  textoModal = signal<string>('');
  flagModalBoton = signal<boolean>(false);
  puedeEliminar = signal<boolean>(false);
  comentarios: IComentario[] = [
    {nombre: "UsuarioEjemplo", texto: "Este es un comentario de ejemplo.", fecha: new Date().toISOString()},
    {nombre: "OtroUsuario", texto: "Otro comentario de ejemplo.", fecha: new Date().toISOString()},
    {nombre: "TercerUsuario", texto: "Un tercer comentario de ejemplo.", fecha: new Date().toISOString()}
  ];

  ngOnInit() {
    this.likes.set(this.publicacion().likes || 0);
    
    const likesActuales = this.publicacion().likes_usuarios || [];
    this.likes_usuarios.set(likesActuales);
    this.puedeEliminar.set(this.verificarPuedeEliminar());
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

  verificarPuedeEliminar() {
    return this.publicacion().email_autor == this.usuario_email()  
            || this.usuario_perfil() === "administrador";
  }

  enviarComentario() {
    console.log('Comentario enviado:', this.mensajeNuevo.value);
    this.mensajeNuevo.reset();
  }

  toggleLike() {
    if (!this.id_usuario_like() || this.id_usuario_like() === "") return; 
  
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
    this.mostrarModal.set(false);
    if(this.hayUsuario() && this.puedeEliminar()){
      this.pubService.eliminarPublicacion(this.publicacion()._id, true);
    }
  }

  confirmarModal(){
    this.mostrarModal.set(true);
    this.tituloModal.set("Confirmar eliminacion");
    this.textoModal.set("¿Estas seguro de que quieres eliminar esta publicacion?");
    this.flagModalBoton.set(true);
  }

  toggleComentarios() {
    this.mostrarComentarios = !this.mostrarComentarios;
  }
}
