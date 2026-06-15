import { Component, ElementRef, ViewChild, signal, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../services/admin';
import { IPublicacion } from '../../publicaciones/publicacion.interface';
import { IComentario } from '../../publicacion/comentario.id.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  imports: [FormsModule, CommonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas implements OnInit {
  admin = inject(AdminService);
  usuarios = this.admin.usuarios;
  publicaciones = this.admin.publicaciones;
  comentarios = this.admin.comentarios;
  agrupadoPublicaciones: { [email: string]: IPublicacion[] } = {};
  agrupadoComentarios: { [email: string]: IComentario[] } = {};
  
  @ViewChild('graficoCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  miGrafico?: Chart;

  fechaInicio = signal<string>('2026-06-01');
  fechaFin = signal<string>('2026-06-15');
  lista = []

  constructor() {
    effect(() => {
      this.actualizarGraficoPublicacionesPorUsuario();
    });
  }
  ngOnInit(): void {
    this.admin.traerPublicaciones();
  }

  agruparYContarPorEmail(listaPublicaciones: IPublicacion[]): { [email: string]: number } {
    const contadores: { [email: string]: number } = {};

    listaPublicaciones.forEach((publicacion: IPublicacion) => {
      const email = publicacion.email_autor;
      if (contadores[email]) {
        contadores[email]++;
      } else {
        contadores[email] = 1;
      }
    });
    return contadores; 
  }

  actualizarGraficoPublicacionesPorUsuario() {
    const inicio = this.fechaInicio();
    const fin = this.fechaFin();
    console.log(this.publicaciones());
    const totalPublicaciones = this.publicaciones();

    if (!totalPublicaciones || totalPublicaciones.length === 0) {
      console.log('Esperando que carguen las publicaciones...');
      return; 
    }
    const filtradas = totalPublicaciones.filter((p: IPublicacion) => 
      p.fecha_publicacion >= inicio && p.fecha_publicacion <= fin);

    if (this.miGrafico) this.miGrafico.destroy();
    
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const datosAgrupados = this.agruparYContarPorEmail(filtradas);
    const etiquetasEjeX = Object.keys(datosAgrupados);
    const etiquetasEjeY = Object.values(datosAgrupados);
    this.miGrafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: etiquetasEjeX,
        datasets: [{
          label: 'Cantidad de publicaciones por usuario',
          data: etiquetasEjeY,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          hoverBackgroundColor: 'rgb(7, 105, 171)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
              font: { size: 16 }
            },
          }
        },
        scales: {
          x: {
            ticks: { color: '#ffffff', },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          y: { 
            beginAtZero: true,
            ticks: { color: '#ffffff', },
            grid: { color: 'rgba(170, 160, 160, 0.1)' }
          }
        }
      }
    });
  }
}
