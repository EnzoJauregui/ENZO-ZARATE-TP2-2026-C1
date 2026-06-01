import { Component, inject, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { IPublicacion } from './publicacion.interface';
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
  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required]),
  });
  publicaciones = this.publicacionService.publicaciones;
  //publicaciones = signal<IPublicacion[]>([]);

  ngOnInit() {
    this.publicacionService.traerPublicaciones()
  }

  toggleInputImagen() {
    this.mostrarInputImagen = !this.mostrarInputImagen;
  }

  publicar() {
    if (this.formulario.invalid) return;
    const nuevaPublicacion: IPublicacion = {
      titulo: this.formulario.value.titulo ?? "",
      contenido: this.formulario.value.mensaje ?? "",
      imagen_url: this.nuevaImagenUrl ? this.nuevaImagenUrl : undefined,
      likes: 0,
      email_autor: this.usuario()?.email ?? "",
      fecha_publicacion: new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }) 
    };
    if(this.usuario() == null){
      this.mensajeModal.set("Debes iniciar sesion para publicar.");
      this.mostrarModal.set(true);
    } else {
      this.publicacionService.crearPublicacion(nuevaPublicacion);
      console.log('Publicacion creada :', nuevaPublicacion);
    }
    
    this.formulario.reset();
    this.nuevaImagenUrl = '';
    this.mostrarInputImagen = false;
  }
}
