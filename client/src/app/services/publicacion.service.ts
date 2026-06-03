import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IPublicacion } from '../pages/publicaciones/publicacion.interface';
import { IPost } from '../pages/publicaciones/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  http = inject(HttpClient);
  publicaciones = signal<IPublicacion[]>([]);
  
  traerPublicaciones() {
    const peticion = this.http.get(environment.apiUrl + 'publicaciones');
    peticion.subscribe((respuesta: any) => {
      const lista_ordenada = respuesta as IPublicacion[];
      lista_ordenada.sort((a, b) => b.fecha_publicacion.localeCompare(a.fecha_publicacion));
      this.publicaciones.set(lista_ordenada.filter(publicacion => !publicacion.fecha_baja));
    });
  }

  crearPublicacion(publicacion: IPost){
    const peticion = this.http.post(environment.apiUrl + 'publicaciones', publicacion);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion creada :', respuesta);
      this.traerPublicaciones();
    })
  } 

  cambiarLikes(id: string, nuevoValor: number, likes_usuarios: string[]){
    const payload_update = { likes: nuevoValor, likes_usuarios: likes_usuarios };
    const peticion = this.http.patch(environment.apiUrl + 'publicaciones/'+id, payload_update);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion actualizada :', respuesta);
      this.traerPublicaciones();
    })
  }

  eliminarPublicacion(id: string, fecha_baja: boolean){
    const payload_update = { fecha_baja: fecha_baja };
    const peticion = this.http.patch(environment.apiUrl + 'publicaciones/'+id, payload_update);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion actualizada :', respuesta);
      this.traerPublicaciones();
    })
  }
}