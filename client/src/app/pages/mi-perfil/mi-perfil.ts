import { Component, inject } from '@angular/core';
import { Card } from "../../components/card/card";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  imports: [Card],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  authService = inject(AuthService);
  perfil = this.authService.usuario;
  // perfil = {
  //   email: 'enzo@mail.com',
  //   nombre: 'Enzo',
  //   imagen_perfil: "./assets/sin_perfil.png",
  //   apellido: 'Zarate',
  //   username: 'enzo_zarate',
  //   fecha_nacimiento: '25/05/2001',
  //   descripcion: 'Esta es una descripcion cualquiera: ajsdnuasshuhasbdchbasihdbcuahbdcihabhbdh'
  // };
}
