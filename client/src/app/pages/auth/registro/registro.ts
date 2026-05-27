import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../components/modal/modal';
import { AuthRegistro } from '../auth-interfaces/authRegistro.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink, Modal],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  auth = inject(AuthService);
  mensajeError = signal<string>("Error");
  mostrarModal = signal<boolean>(true);

  formulario = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    fecha_nacimiento: new FormControl("", [Validators.required]),
    perfil: new FormControl("", [Validators.required]),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(150)]),
    repetirPassword:new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)]),
    password: new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)]),

  });

  verificarConstrasenias(){
    const {password, repetirPassword} = this.formulario.value

    if(password !== repetirPassword){
      this.mensajeError.set("Las constraseñas no coinciden")
      this.mostrarModal.set(true);
      return true;
    }
    return false;
  }
  
  accion(){
    if(this.formulario.invalid || this.verificarConstrasenias()) return true;
    
    const { repetirPassword, ...datosRegistro } = this.formulario.value;
    try{
      this.auth.registro(datosRegistro as AuthRegistro);
    } catch (e: any){
      this.mensajeError.set(e.message);
      this.mostrarModal.set(true);
    }
    return false
  }
}
