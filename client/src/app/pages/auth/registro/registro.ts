import { Component, effect, inject, input, output, InputSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../components/modal/modal';
import { AuthRegistro } from '../auth-interfaces/authRegistro.interface';
import { AuthService } from '../../../services/auth.service';
import { CambiarBorde } from "../../../directivas/cambiar-borde";
import { ZoomMouse } from "../../../directivas/zoom-mouse";

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink, Modal, CambiarBorde, ZoomMouse],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  auth = inject(AuthService);
  mensajeError = signal<string>("Error");
  mostrarModal = signal<boolean>(false);
  permitirPerfil: InputSignal<boolean> = input(false);
  traerTodos = output<void>()
  formulario = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    fecha_nacimiento: new FormControl("", [Validators.required]),
    imagen_url: new FormControl("", [Validators.required]),
    perfil: new FormControl("usuario", [Validators.required]),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(150)]),
    repetirPassword:new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)]),
    password: new FormControl("", [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)]),

  });

  constructor() {
    effect(() => {
      const url = this.auth.url_imagen();
      if (url != "") {
        this.formulario.patchValue({ imagen_url: url });
        console.log("url: "+url);
      }
    });
  }

  verificarConstrasenias(){
    const {password, repetirPassword} = this.formulario.value

    if(password !== repetirPassword){
      this.mensajeError.set("Las constraseñas no coinciden")
      this.mostrarModal.set(true);
      return true;
    }
    return false;
  }
  
  archivoSeleccionado(event: Event){
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length){
      const archivo = input.files[0];
      const formData = new FormData();
      formData.append('imagen_url', archivo);
      try{
        this.auth.subirImagen(formData);
      } catch(e: any){
        this.mensajeError.set(e.message);
        this.mostrarModal.set(true);
      }
    }
  }

  traerUsuarios(){
    this.traerTodos.emit()
  }

  accion(){
    if(this.formulario.invalid || this.verificarConstrasenias()) return;
    
    const { repetirPassword, ...datosRegistro } = this.formulario.value;
    try{
      this.auth.registro(datosRegistro as AuthRegistro, ()=>this.traerUsuarios(), !this.permitirPerfil);
      this.formulario.reset();
    } catch (e: any){
      this.mensajeError.set(e.message);
      this.mostrarModal.set(true);
    }
    return false
  }
}
