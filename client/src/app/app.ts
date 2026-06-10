import { Component, inject, signal, effect } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Modal } from './components/modal/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, Modal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');

  auth = inject(AuthService);
  
  usuario = this.auth.usuario;
  mostrarModal = signal<boolean>(false);

  constructor(){
    effect(() => {
      if (this.auth.cronometro.tiempoMedioAlcanzado()) {
        this.mostrarModal.set(true);
      }
      if(this.auth.cronometro.tiempoMaximoFinalAlcanzado()){
        this.auth.cerrarSesion();
        this.mostrarModal.set(false)
      }
    });
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

  noExtenderSesion(){
    this.auth.cronometro.extenderTiempo.set(true);
    this.mostrarModal.set(false);
    this.auth.cronometro.reaunudarContador();
  }

  ExtenderSesion(){
    
  }
}
