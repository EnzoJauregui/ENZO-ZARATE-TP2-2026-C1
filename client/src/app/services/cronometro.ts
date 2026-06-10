import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cronometro {
  tiempoTranscurrido = signal<number>(0);
  tiempoMedioAlcanzado = signal<boolean>(false);
  tiempoMaximoFinalAlcanzado = signal<boolean>(false);
  extenderTiempo = signal<boolean>(false);

  tiempoMaximo: number = 10;   
  tiempoMaximoFinal: number = 15;
  intervalo: number | null = null

  tiempoAMostrar = computed(() => {
    const min = Math.floor(this.tiempoTranscurrido() / 60);
    const seg = this.tiempoTranscurrido() % 60;
    return `${min}:${seg.toString().padStart(2, '0')}`;
  });
  
  iniciarContador(){
    this.reiniciarContador();
    this.reaunudarContador();
  }

  reaunudarContador() {
    this.intervalo = setInterval(() => {
      this.tiempoTranscurrido.update(tiempo => {
        let tiempoAComparar = this.extenderTiempo() ? this.tiempoMaximoFinal : this.tiempoMaximo;
        if (tiempo < tiempoAComparar) {
          return tiempo + 1;
        } else {
          this.finalizarPorTiempo();
          return tiempo;
        }
      });
    }, 1000);
  }

  reiniciarContador() {
    this.detenerContador();
    this.tiempoTranscurrido.set(0); 
    this.tiempoMedioAlcanzado.set(false);
    this.tiempoMaximoFinalAlcanzado.set(false); 
    this.extenderTiempo.set(false);
  }

  finalizarPorTiempo() {
    this.detenerContador();
    if(this.extenderTiempo()){
      this.tiempoMaximoFinalAlcanzado.set(true);
    } else {
      this.tiempoMedioAlcanzado.set(true);
    }
    console.log(this.tiempoMedioAlcanzado())
    console.log(this.tiempoMaximoFinalAlcanzado());
  }

  detenerContador() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null; 
    }
  }
}
