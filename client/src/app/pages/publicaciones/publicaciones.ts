import { Component, computed, inject, signal } from '@angular/core';
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
  paginaActual = signal<number>(1);
  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required]),
  });
  limitePorPagina: number = 3;
  publicaciones = this.publicacionService.publicaciones;
  totalPaginas = computed(() => {
    return Math.ceil(this.publicaciones().length / this.limitePorPagina) || 1;
  });
  publicacionesPorPagina = computed(() => {
    let lista = this.publicaciones();
    const inicio = (this.paginaActual() - 1) * this.limitePorPagina;
    const fin = inicio + this.limitePorPagina;
    return lista.slice(inicio, fin);
  })
  //publicaciones = signal<IPublicacion[]>([]);

  ngOnInit() {
    this.publicacionService.traerPublicaciones();
    
  }

  toggleInputImagen() {
    this.mostrarInputImagen = !this.mostrarInputImagen;
  }

  publicar() {
    if (this.formulario.invalid) return;
    const nuevaPublicacion: IPost = {
      titulo: this.formulario.value.titulo ?? "",
      contenido: this.formulario.value.mensaje ?? "",
      imagen_url: this.nuevaImagenUrl ? this.nuevaImagenUrl : undefined,
      likes: 0,
      likes_usuarios: [],
      email_autor: this.usuario()?.email ?? "",
      fecha_publicacion: new Date().toISOString(),
      fecha_baja: false,
    };
    this.crearPublicacion(nuevaPublicacion);
    this.formulario.reset();
    this.nuevaImagenUrl = '';
    this.mostrarInputImagen = false;
  }

  crearPublicacion(nuevaPublicacion: IPost) {
    if(this.usuario() == null){
      this.mensajeModal.set("Debes iniciar sesion para publicar.");
      this.mostrarModal.set(true);
    } else {
      this.publicacionService.crearPublicacion(nuevaPublicacion);
      console.log('Publicacion creada :', nuevaPublicacion);
    }
  }
}
