import { Component } from '@angular/core';
import { IComentario } from './comentarios.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../components/modal/modal';
import { DatePipe } from '@angular/common';
import { Comentario } from '../../components/comentario/comentario';

@Component({
  selector: 'app-publicacion',
  imports: [ReactiveFormsModule, DatePipe, Modal, Comentario],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {

  mensajeNuevo = new FormControl('', [Validators.required])
  comentarios: IComentario[] = [
    {
      email_autor: "UsuarioEjemplo", 
      contenido: "Este es un comentario de ejemplo.", 
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

  get validar(): boolean {
    const mensajeLimpio = this.mensajeNuevo.value?.trim();
    return this.mensajeNuevo.invalid || !mensajeLimpio;
  }

  enviarComentario() {
    console.log('Comentario enviado:', this.mensajeNuevo.value);
    this.mensajeNuevo.reset();
  }
}
