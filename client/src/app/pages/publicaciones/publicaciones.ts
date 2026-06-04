import { Component, computed, effect, inject, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { IPost } from './post.interface';
import { AuthService } from '../../services/auth.service';
import { Modal } from '../../components/modal/modal';


@Component({
  selector: 'app-publicaciones',
  imports: [Card, ReactiveFormsModule, Modal],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})

export class Publicaciones {
  publicacionService = inject(PublicacionService);
  authService = inject(AuthService);
  usuario = this.authService.usuario;

  nuevaImagenUrl: string = '';
  mostrarInputImagen: boolean = false;
  mostrarModal = signal<boolean>(false);
  mensajeModal= signal<string>('');

  limitePorPagina: number = 4;
  paginaActual = signal<number>(1);
  usuarioFiltradoId = signal<string | undefined>(undefined);
  criterioOrden = signal<string>("fecha");

  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required]),
  });
  publicaciones = this.publicacionService.publicaciones;
  totalPaginas = computed(() => {
    const total = this.publicacionService.totalPublicaciones();
    return Math.ceil(total / this.limitePorPagina) || 1;
  });

  constructor(){ effect( () => { this.cargarDatos(); } ) }

  cargarDatos(){
    const offSet = (this.paginaActual() - 1) * this.limitePorPagina;
    this.publicacionService.traerPublicaciones(
      this.limitePorPagina, 
      offSet, 
      this.usuarioFiltradoId(), 
      this.criterioOrden()
    );
  }

  cambiarOrden(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.criterioOrden.set(select.value);
    this.paginaActual.set(1);
  }

  toggleInputImagen() {
    this.mostrarInputImagen = !this.mostrarInputImagen;
  }

  publicar() {
    if (this.formulario.invalid) return;
    if(this.usuario() == null){
      this.mensajeModal.set("Debes iniciar sesion para publicar.");
      this.mostrarModal.set(true);
      return;
    }
    const nuevaPublicacion: IPost = {
      titulo: this.formulario.value.titulo ?? "",
      contenido: this.formulario.value.mensaje ?? "",
      imagen_url: this.nuevaImagenUrl ? this.nuevaImagenUrl : undefined,
      likes: 0,
      likes_usuarios: [],
      email_autor: this.usuario()?.email ?? "",
      fecha_publicacion: new Date().toISOString(),
      fecha_baja: false,
      id_autor: this.usuario()._id,
    };
    console.log(nuevaPublicacion);
    this.publicacionService.crearPublicacion(nuevaPublicacion, () => {
      this.formulario.reset();
      this.nuevaImagenUrl = '';
      this.mostrarInputImagen = false;
      this.paginaActual.set(1);
      this.cargarDatos();
    });
  }
}
