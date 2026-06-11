import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  admin = inject(AdminService);

  usuarios = this.admin.usuarios;

  ngOnInit(): void {
    this.admin.traerUsuarios();
  }
}
