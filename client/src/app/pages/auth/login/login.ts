import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../components/modal/modal';
import { AuthService } from '../../../services/auth.service';
import { AuthLogin } from '../auth-interfaces/authLogin.interface';
import { CambiarBorde } from "../../../directivas/cambiar-borde";
import { ZoomMouse } from "../../../directivas/zoom-mouse";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Modal, CambiarBorde, ZoomMouse],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(AuthService);
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
      email: 'raulhgarcia@mail.com',
      password: '123456aA'
    });
  }  
  accion(){
    if(this.formulario.invalid) return;
    
    this.auth.login(this.formulario.value as AuthLogin, (mensajeError) => {
      this.mensajeError.set(mensajeError);
      this.mostrarModal.set(true);
    });
  }
}
