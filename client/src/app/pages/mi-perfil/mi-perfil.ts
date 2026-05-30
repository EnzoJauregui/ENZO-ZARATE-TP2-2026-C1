import { Component } from '@angular/core';
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-mi-perfil',
  imports: [Card],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  perfil = {
    email: 'enzo@mail.com',
    nombre: 'Enzo',
    imagen_perfil: "./assets/sin_perfil.png",
    apellido: 'Zarate',
    username: 'enzo_zarate',
    fecha_nacimiento: '25/05/2001',
    descripcion: 'Esta es una descripcion cualquiera: ajsdnuasshuhasbdchbasihdbcuahbdcihabhbdh'
  };
}
