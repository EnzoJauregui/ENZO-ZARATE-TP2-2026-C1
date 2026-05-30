import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-publicaciones',
  imports: [Card, ReactiveFormsModule],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones {
  nuevaImagenUrl: string = '';
  mostrarInputImagen: boolean = false;
  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required]),
  });

  toggleInputImagen() {
    this.mostrarInputImagen = !this.mostrarInputImagen;
  }

  publicar() {
    if (this.formulario.invalid) return;
    const nuevaPublicacion = {
      titulo: this.formulario.value.titulo,
      mensaje: this.formulario.value.mensaje,
      imagen: this.nuevaImagenUrl ? this.nuevaImagenUrl : null,
      fecha: new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }) 
    };
    console.log('Publicacion creada :', nuevaPublicacion);
    
    this.formulario.reset();
    this.nuevaImagenUrl = '';
    this.mostrarInputImagen = false;
  }
}
