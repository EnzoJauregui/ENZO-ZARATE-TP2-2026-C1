import { Component, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  tituloModal: InputSignal<string> = input("");
  textoModal: InputSignal<string> = input("");
  flagAbrir: InputSignal<boolean> = input(false); 
  flagModalBoton: InputSignal<boolean> = input(true);
  cerrarModal = output<void>();      
  confirmarModal = output<void>();  

  close() { this.cerrarModal.emit(); }
  confirmar() { this.confirmarModal.emit(); }
}
