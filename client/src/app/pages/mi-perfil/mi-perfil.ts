import { Component, effect, inject } from '@angular/core';
import { Card } from "../../components/card/card";
import { AuthService } from '../../services/auth.service';
import { PublicacionService } from '../../services/publicacion.service';

@Component({
  selector: 'app-mi-perfil',
  imports: [Card],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  authService = inject(AuthService);
  publicacionService = inject(PublicacionService)

  perfil = this.authService.usuario;
  publicaciones = this.publicacionService.publicaciones;

  constructor() { effect( () => { this.cargarDatos(); })}

  cargarDatos(){
    const usuarioActual = this.perfil();
    if (usuarioActual && usuarioActual._id) {
      console.log(usuarioActual)
      this.publicacionService.traerPublicaciones(3, 0, usuarioActual._id, 'fecha');
    }
  }
}
