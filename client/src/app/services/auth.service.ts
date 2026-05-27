import { inject, Injectable } from '@angular/core';
import { AuthLogin } from '../pages/auth/auth-interfaces/authLogin.interface';
import { AuthRegistro } from '../pages/auth/auth-interfaces/authRegistro.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   httpClient = inject(HttpClient);
  
  async loginS(usuario: AuthLogin){
    const peticion = this.httpClient.post(environment.apiUrl+'autentication/login',
      usuario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      peticion.subscribe((respuesta: any) => {
        console.log(respuesta);

        localStorage.setItem('token', respuesta.token)
      });
  }

  login(usuario: AuthLogin){
      const peticion = this.httpClient.post(environment.apiUrl+'autentication/login',
      usuario, {
        headers: {
          'Content-Type': 'application/json',
        }, 
        credentials: "include",
      });
      peticion.subscribe((respuesta: any) => {
        console.log(respuesta);
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
        console.log(respuesta);
      });
  }
}
