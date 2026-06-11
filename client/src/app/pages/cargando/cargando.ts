import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cargando',
  imports: [],
  templateUrl: './cargando.html',
  styleUrl: './cargando.css',
})
export class Cargando implements OnInit {
  auth = inject(AuthService);
  
  ngOnInit(): void {
    this.vallidarTokenInicial();
  }

  vallidarTokenInicial(){
    this.auth.verificarConexion();
  }
}
