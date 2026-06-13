import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin';
import { Registro } from '../../auth/registro/registro';

@Component({
  selector: 'app-usuarios',
  imports: [Registro],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  admin = inject(AdminService);

  registrar = false;
  usuarios = this.admin.usuarios;

  ngOnInit(): void {
    this.admin.traerUsuarios();
  }

  toogleRegistro(){
    this.registrar = !this.registrar;
  }

  modificarUsuario(id: string, fecha_baja: boolean){
    this.admin.modificarUsuario(id, fecha_baja, ()=>this.admin.traerUsuarios());
  }
}
