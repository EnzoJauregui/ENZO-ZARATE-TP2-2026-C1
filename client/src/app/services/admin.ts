import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);

  usuarios = signal<any>(null);
  publicaciones = signal<any>(null);
  comentarios = signal<any>(null);

  traerUsuarios(){
    const peticion = this.http.get(environment.apiUrl+"usuarios", 
      { withCredentials:true });
    peticion.subscribe(((res)=>{
      this.usuarios.set(res);
      console.log(this.usuarios());
    }))
  }

  traerPublicaciones(){
    const peticion = this.http.get(environment.apiUrl+"estadisticas/publicaciones", 
      { withCredentials:true });
    peticion.subscribe(((res)=>{
      this.publicaciones.set(res);
      console.log(this.usuarios());
    }))
  }

  traerComentarios(){
    const peticion = this.http.get(environment.apiUrl+"estadisticas/comentarios", 
      { withCredentials:true });
    peticion.subscribe(((res)=>{
      this.comentarios.set(res);
      console.log(this.usuarios());
    }))
  }

  modificarUsuario(id: string, fecha_baja: boolean, callbackSuccess?: ()=>void){
    const payload = { fecha_baja: fecha_baja }
    const peticion = this.http.patch(`${environment.apiUrl}usuarios/${id}`, payload, { withCredentials: true });

    peticion.subscribe( (res) => {
      console.log("edicion exitosa: ", res);
      if(callbackSuccess) callbackSuccess();
    });
  }
}
