import { inject, Injectable, signal } from '@angular/core';
import { AuthLogin } from '../pages/auth/auth-interfaces/authLogin.interface';
import { AuthRegistro } from '../pages/auth/auth-interfaces/authRegistro.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  usuario = signal<any>(null);
  
  login(usuario: AuthLogin){
      const peticion = this.httpClient.post(environment.apiUrl+'autentication/login',
      usuario, {
        headers: {
          'Content-Type': 'application/json',
        }, 
        credentials: "include",
      });
      peticion.subscribe((respuesta: any) => {
        this.usuario.set(respuesta);
        console.log(this.usuario());
        this.router.navigateByUrl("/mi-perfil");
      });
  }

  registro(usuario: AuthRegistro){
    const peticion = this.httpClient.post(environment.apiUrl+'autentication/registro',
      usuario, {
        headers: {
          'Content-Type': 'application/json',
        }, 
        credentials: "include",
      });
      peticion.subscribe((respuesta: any) => {
        this.usuario.set(respuesta);
        console.log(this.usuario());
        this.router.navigateByUrl("/mi-perfil");
      });
  }

  cerrarSesion(){
    this.usuario.set(null);
    this.router.navigateByUrl("/auth/login");
  }
}
