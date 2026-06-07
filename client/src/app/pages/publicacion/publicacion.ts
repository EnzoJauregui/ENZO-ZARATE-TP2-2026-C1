import { Component, computed, inject, signal } from '@angular/core';
import { IComentarioParcial } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../components/modal/modal';
import { DatePipe } from '@angular/common';
import { Comentario } from '../../components/comentario/comentario';
import { PublicacionService } from '../../services/publicacion.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-publicacion',
  imports: [ReactiveFormsModule, DatePipe, Comentario],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion{
  authService = inject(AuthService);
  publicacionService = inject(PublicacionService);
  comentarioService = inject(ComentariosService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  id_publicacion = this.route.snapshot.paramMap.get("id");

  primerCarga = signal<boolean>(true);
  usuario = this.authService.usuario;
  publicacion = computed(() => this.publicacionService.publicacion());
  comentarios = computed(() => this.comentarioService.comentarios())
  mensajeNuevo = new FormControl('', [Validators.required])
  cantidadComentarios = signal<number>(0);
 
  ngOnInit(){
    if (this.id_publicacion){
      this.publicacionService.traerPublicacion(this.id_publicacion);
      this.cargaParcialDeComentarios();
    }
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

  get hayUsuario(): boolean {
    const user = this.usuario();
    if(user){
      return true;
    }
    return false;
  }

  get hayMasDeTres(): boolean{
    if(this.cantidadComentarios() > 3){
      return true;
    } else {
      return false;
    }
  }

  volver(){
    this.router.navigateByUrl('/publicaciones');
  }

  actualizarComentarios(){
    this.primerCarga.set(!this.primerCarga())
    this.cargarComentarios();
  }

  cargarComentarios(){
    if(this.primerCarga()){
      this.cargaParcialDeComentarios();
    } else {
      this.cargaTotalDeComentarios();
    }
  }

  cargaTotalDeComentarios(){
    if(this.id_publicacion){
      this.comentarioService.traerComentarios(this.id_publicacion, 0, 0);
    }
  }

  cargaParcialDeComentarios(){
    if(this.id_publicacion){
      this.comentarioService.traerComentarios(this.id_publicacion, 3, 0);
    }
  }

  enviarComentario() {
    if(this.id_publicacion && this.mensajeNuevo.value && this.hayUsuario){
      const payload: IComentarioParcial = {
        id_autor: this.usuario()._id,
        email_autor: this.usuario().email,
        id_publicacion: this.id_publicacion,
        contenido: this.mensajeNuevo.value.trim(),
        fecha_creacion: new Date().toISOString(),
        fue_editado: false,
        dado_de_baja: false,
      }
      this.comentarioService.crearComentario(payload, () => this.cargarComentarios());
      this.mensajeNuevo.reset();
    }
  }
}
