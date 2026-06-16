import { Component, input, InputSignal, signal, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { IPublicacion } from '../../pages/publicaciones/publicacion.interface';
import { Modal } from '../modal/modal';
import { Router } from '@angular/router';
import { FechaPipe } from '../../pipes/fecha-pipe';
import { EmailAvatarPipe } from '../../pipes/email-avatar-pipe';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule, FechaPipe, EmailAvatarPipe, Modal],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  pubService = inject(PublicacionService);
  router = inject(Router);

  publicacion: InputSignal<IPublicacion> = input<IPublicacion>({} as IPublicacion);
  hasLike= signal<boolean> (false);
  enPantallaCompleta: boolean = false;
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
  cambioPublicacion = output<void>();
 

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

  verificarPuedeEliminar() {
    return this.publicacion().email_autor == this.usuario_email()  
            || this.usuario_perfil() === "administrador";
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
    this.pubService.cambiarLikes(
      this.publicacion()._id, 
      this.likes_usuarios().length, 
      this.likes_usuarios(),
      () => {
        this.cambioPublicacion.emit();
      });
  }
  
  eliminarPublicacion(){
    this.mostrarModal.set(false);
    if(this.hayUsuario() && this.puedeEliminar()){
      this.pubService.eliminarPublicacion(
        this.publicacion()._id, true, () => {
          this.cambioPublicacion.emit();
        });
    }
  }

  confirmarModal(){
    this.mostrarModal.set(true);
    this.tituloModal.set("Confirmar eliminacion");
    this.textoModal.set("¿Estas seguro de que quieres eliminar esta publicacion?");
    this.flagModalBoton.set(true);
  }

  mostrarEnPantallaCompleta() {
    this.enPantallaCompleta = true;
    if(this.publicacion()._id){
      this.router.navigateByUrl(`publicaciones/${this.publicacion()._id}`)
    }
  }
}
