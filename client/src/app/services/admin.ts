import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);

  usuarios = signal<any>(null);

  traerUsuarios(){
    const peticion = this.http.get(environment.apiUrl+"autentication", 
      { withCredentials:true });
    peticion.subscribe(((res)=>{
      this.usuarios.set(res);
    }))

  }
}
