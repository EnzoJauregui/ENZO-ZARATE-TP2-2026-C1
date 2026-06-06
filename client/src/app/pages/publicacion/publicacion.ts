import { Component, computed, inject, signal } from '@angular/core';
import { IComentario } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../components/modal/modal';
import { DatePipe } from '@angular/common';
import { Comentario } from '../../components/comentario/comentario';
import { PublicacionService } from '../../services/publicacion.service';
import { IPublicacion } from '../publicaciones/publicacion.interface';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  imports: [ReactiveFormsModule, DatePipe, Comentario],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion{
  authService = inject(AuthService);
  publicacionService = inject(PublicacionService);
  route = inject(ActivatedRoute)
  usuario = this.authService.usuario;
  publicacion = computed(() => this.publicacionService.publicacion());

  mensajeNuevo = new FormControl('', [Validators.required])
  comentarios: IComentario[] = [
    {
      email_autor: "UsuarioEjemplo", 
      contenido: "Este es un comentario de ejemploasdassd dnjasivjnaijnajjajfjqafjvjnfjnvndnvfndjnfjnvdjfdjnvdjnvjndfjnvjfnnjf.", 
      fecha_creacion: new Date().toISOString(),
      id_publicacion: "1a3d1",
      fue_editado: false,
    },
    {
      email_autor: "OtroUsuario", 
      contenido: "Otro comentario de ejemplo.", 
      fecha_creacion: new Date().toISOString(),
      id_publicacion: "string",
      fue_editado: false
    },
    {
      email_autor: "TercerUsuario", 
      contenido: "Un tercer comentario de ejemplo.", 
      fecha_creacion: new Date().toISOString(),
      id_publicacion: "string",
      fue_editado: false
    }
  ];

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get("id");    
    if (id) this.publicacionService.traerPublicacion(id);
  }

  get comprobarLike(): boolean {
    const pub = this.publicacion();
    const user = this.usuario();
    if (pub?.likes_usuarios && user?._id) {
      return pub.likes_usuarios.includes(user._id);
    }
    return false;
  }

  get validar(): boolean {
    const mensajeLimpio = this.mensajeNuevo.value?.trim();
    return this.mensajeNuevo.invalid || !mensajeLimpio;
  }

  enviarComentario() {
    console.log('Comentario enviado:', this.mensajeNuevo.value);
    this.mensajeNuevo.reset();
  }
}
