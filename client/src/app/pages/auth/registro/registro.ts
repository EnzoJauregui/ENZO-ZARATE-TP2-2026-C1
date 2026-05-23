import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../components/modal/modal';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink, Modal],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  mensajeError = signal<string>("Error");
  mostrarModal = signal<boolean>(false);

  formulario = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    edad: new FormControl("", [Validators.required, Validators.min(6), Validators.max(90)]),
    fechaNacimiento: new FormControl("", [Validators.required]),
    perfil: new FormControl("", [Validators.required]),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(150)]),
    repetirPassword:new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)]),
    password: new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)]),

  });
  
  accion(){
    console.log("Registro");
  }
}
