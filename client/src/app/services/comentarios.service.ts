import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IComentarioParcial } from '../pages/publicacion/comentarios.interface';
import { environment } from '../../environments/environment.development';
import { IComentario } from '../pages/publicacion/comentario.id.interface';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  http = inject(HttpClient);

  comentarios = signal<IComentario[] | null>(null);

  traerComentarios(id_publicacion: string, limit?: number, offset?: number){
    let url = `${environment.apiUrl}comentarios?id_publicacion=${id_publicacion}`;
    if(limit !== undefined){
      url+=`&limit=${limit}`
    }
    if(offset !== undefined){
      url+=`&offset=${offset}`;
    }
    this.http.get(url).subscribe((res) => {
      this.comentarios.set(res as IComentario[]);
      console.log("comentarios obtenidos: ", this.comentarios());
    });
  }

  crearComentario( comentarioNuevo: IComentarioParcial, callbackSuccess?: () => void ){
    const peticion = this.http.post(environment.apiUrl+ "comentarios", comentarioNuevo);
    peticion.subscribe( (respuesta: any) => {
      console.log("comentario creado: ", respuesta);
      if(callbackSuccess) callbackSuccess();
    });
  }

  editarComentario(id: string, contenido: string, callbackSuccess?: () => void){
    const payload = { contenido: contenido, fue_editado: true };
    const peticion = this.http.patch(environment.apiUrl + "comentarios/" + id, payload);
    peticion.subscribe( (respuesta) => {
      console.log("Mensaje editado: ", respuesta);
      if(callbackSuccess) callbackSuccess();
    });
  }
}
