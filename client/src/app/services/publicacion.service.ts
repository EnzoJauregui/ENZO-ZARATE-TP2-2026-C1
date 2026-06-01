import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IPublicacion } from '../pages/publicaciones/publicacion.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  http = inject(HttpClient);
  publicaciones = signal<IPublicacion[]>([]);
  
  traerPublicaciones() {
    const peticion = this.http.get(environment.apiUrl + 'publicaciones');
    peticion.subscribe((respuesta: any) => {
      this.publicaciones.set(respuesta as IPublicacion[]);
      console.log(this.publicaciones());
    });
  }

  crearPublicacion(publicacion: IPublicacion){
    const peticion = this.http.post(environment.apiUrl + 'publicaciones', publicacion);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion creada :', respuesta);
      this.traerPublicaciones();
    })
  } 
}
