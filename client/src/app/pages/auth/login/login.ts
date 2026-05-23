import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../components/modal/modal';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Modal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mensajeError= signal<string>("Algo ocurrio");
  mostrarModal = signal<boolean>(false);

  formulario = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)])
  });

  rellenarFormulario() {
    this.formulario.patchValue({
      email: 'enzo@mail.com',
      password: '123456aA'
    });
  }  
  accion(){
    console.log("login");
  }
}
