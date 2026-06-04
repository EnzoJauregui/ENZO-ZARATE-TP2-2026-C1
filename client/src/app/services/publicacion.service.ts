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
  totalPublicaciones = signal<number>(0);
  
  traerPublicaciones(limit: number, offset: number, usuario_id?: string, criterioOrden: string = 'fecha') {
    let url = `${environment.apiUrl}publicaciones?orden=${criterioOrden}&limit=${limit}&offset=${offset}`;
    console.log(usuario_id);
    if(usuario_id){
      url += `&id_autor=${usuario_id}`
    }
    const peticion = this.http.get(url);
    peticion.subscribe((respuesta: any) => {
      const lista = respuesta as IPublicacion[];
      this.publicaciones.set(lista);
      
      if(offset === 0){
        if (lista.length < limit) {
          this.totalPublicaciones.set(lista.length);
        } else {
          this.totalPublicaciones.set(limit + 1);
        }
      } else {
        if(lista.length < limit) {
          this.totalPublicaciones.set(offset + lista.length);
        } else {
          this.totalPublicaciones.set(offset + limit + 1);
        }
      }
    });
  }

  crearPublicacion(publicacion: IPost, callbackSuccess?: () => void){
    const peticion = this.http.post(environment.apiUrl + 'publicaciones', publicacion);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion creada :', respuesta);
      if(callbackSuccess) callbackSuccess();
    })
  } 

  cambiarLikes(id: string, nuevoValor: number, likes_usuarios: string[], callbackSuccess?: () => void){
    const payload_update = { likes: nuevoValor, likes_usuarios: likes_usuarios };
    const peticion = this.http.patch(environment.apiUrl + 'publicaciones/'+id, payload_update);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion actualizada :', respuesta);
      if(callbackSuccess) callbackSuccess();
    })
  }

  eliminarPublicacion(id: string, fecha_baja: boolean, callbackSuccess?: () => void){
    const payload_update = { fecha_baja: fecha_baja };
    const peticion = this.http.patch(environment.apiUrl + 'publicaciones/'+id, payload_update);
    peticion.subscribe( (respuesta: any) => {
      console.log('Publicacion actualizada :', respuesta);
      if(callbackSuccess) callbackSuccess();
    })
  }
}