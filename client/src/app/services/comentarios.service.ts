import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IComentario } from '../pages/publicacion/comentarios.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  http = inject(HttpClient);

  comentarios = signal<IComentario[] | null>(null);

  traerComentarios(id: string){
    const url = ""

    this.http.get(environment.apiUrl+'comentarios')
  }
}
