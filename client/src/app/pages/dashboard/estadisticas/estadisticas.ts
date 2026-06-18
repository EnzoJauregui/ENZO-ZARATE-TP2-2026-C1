import { Component, ElementRef, ViewChild, signal, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../services/admin';
import { IPublicacion } from '../../publicaciones/publicacion.interface';
import { IComentario } from '../../publicacion/comentario.id.interface';
import { ZoomMouse } from "../../../directivas/zoom-mouse";

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  imports: [FormsModule, CommonModule, ZoomMouse],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas implements OnInit {
  admin = inject(AdminService);
  usuarios = this.admin.usuarios;
  publicaciones = this.admin.publicaciones;
  comentarios = this.admin.comentarios;
  
  @ViewChild('graficoBarras', { static: true }) graficoBarras!: ElementRef<HTMLCanvasElement>;
  miGraficoBarra?: Chart<'bar'>;

  @ViewChild('graficoTorta', { static: true }) graficoTorta!: ElementRef<HTMLCanvasElement>;
  miGraficoTorta?: Chart<'doughnut'>;

  @ViewChild('graficoLineal', { static: true }) graficoLineal!: ElementRef<HTMLCanvasElement>;
  miGraficoLineal?: Chart<'line'>;



  fechaInicio = signal<string>('2026-06-01');
  fechaFin = signal<string>('2026-06-15');

  constructor() {
    effect(() => {
      this.fechaInicio();
      this.fechaFin();
      this.publicaciones();
      this.comentarios();
      setTimeout(()=>{
        this.actualizarGraficoPublicacionesPorUsuario();
        this.actualizarGraficoComentariosPorFecha();
        this.actualizarGraficoComentariosPorPublicacion();
      }, 50);
    });
  }
  ngOnInit(): void {
    this.admin.traerPublicaciones();
    this.admin.traerComentarios();
    this.admin.traerUsuarios();
  }

  agruparYContarPorComentarios(listaComentarios: IComentario[])
  : { [id: string]: number }{
    const contadores: { [id: string]: number } = {}

    listaComentarios.forEach((comentario: IComentario) => {
      const publicaion = comentario.id_publicacion;
      if(contadores[publicaion]){
        contadores[publicaion]++;
      } else {
        contadores[publicaion] = 1;
      }
    });
    return contadores;
  }

  agruparYContarPorEmail(listaPublicaciones: IPublicacion[])
  : { [email: string]: number } {
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

  agruparYContarPorComentariosPorTiempo(listaComentarios: IComentario[])
  : { [id: string]: number }{
    const contadores: { [id: string]: number } = {}
    listaComentarios.forEach((comentario: IComentario) =>{
      const fecha = comentario.fecha_creacion.split('T')[0];
      if(contadores[fecha]){
        contadores[fecha]++;
      } else {
        contadores[fecha] = 1;
      }
    });
    console.log(contadores);
    return contadores;
  }

  actualizarGraficoComentariosPorFecha(){
    const inicio = this.fechaInicio();
    const fin = this.fechaFin();
    const totalComentarios = this.comentarios();

    if(!totalComentarios || totalComentarios.length === 0){
      console.log("Cargando comentarios ...");
      return;
    }

    const filtradas = totalComentarios.filter((c: IComentario) => 
      c.fecha_creacion >= inicio && c.fecha_creacion <= fin);
    
    if(this.miGraficoLineal) this.miGraficoLineal.destroy();

    const ctxLineal = this.graficoLineal.nativeElement.getContext('2d');
    if(!ctxLineal) return;

    const datosAgrupados = this.agruparYContarPorComentariosPorTiempo(filtradas);
    const etiquetasEjeX = Object.keys(datosAgrupados);
    const etiquetasEjeY = Object.values(datosAgrupados);

    this.miGraficoLineal = new Chart(ctxLineal, {
       type: 'line',
      data: {
        labels: etiquetasEjeX,
        datasets: [{
          label: 'Cantidad de comentarios por fecha',
          data: etiquetasEjeY,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
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

  actualizarGraficoComentariosPorPublicacion(){
    const inicio = this.fechaInicio();
    const fin = this.fechaFin();
    const totalComentarios = this.comentarios();

    if(!totalComentarios || totalComentarios.length === 0){
      console.log("Cargando comentarios ...");
      return;
    }
    const filtradas = totalComentarios.filter((c: IComentario) => 
      c.fecha_creacion >= inicio && c.fecha_creacion <= fin);
    
    if(this.miGraficoTorta) this.miGraficoTorta.destroy();

    const ctxTorta = this.graficoTorta.nativeElement.getContext('2d');
    if(!ctxTorta) return;

    const datosAgrupados = this.agruparYContarPorComentarios(filtradas);
    const etiquetasEjeX = Object.keys(datosAgrupados);
    const etiquetasEjeY = Object.values(datosAgrupados);
  
    this.miGraficoTorta = new Chart(ctxTorta, {
      type: 'doughnut',
      data: {
        labels: etiquetasEjeX,
        datasets: [{
          label: 'Cantidad comentarios por publicacion',
          data: etiquetasEjeY,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)', 
            'rgba(255, 159, 64, 0.7)'  ,
            'rgba(15, 9, 2, 0.7)',
            'rgba(238, 121, 4, 0.7)',
          ],
          borderWidth: 2,
        }]
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        cutout: '50%',
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#ffffff',
              font: { size: 14 }
            },
          }
        },
      }
    })
  }

  actualizarGraficoPublicacionesPorUsuario() {
    const inicio = this.fechaInicio();
    const fin = this.fechaFin();
    const totalPublicaciones = this.publicaciones();

    if (!totalPublicaciones || totalPublicaciones.length === 0) {
      console.log('Esperando que carguen las publicaciones...');
      return; 
    }
    const filtradas = totalPublicaciones.filter((p: IPublicacion) => 
      p.fecha_publicacion >= inicio && p.fecha_publicacion <= fin);

    if (this.miGraficoBarra) this.miGraficoBarra.destroy();
    
    const ctxBarras = this.graficoBarras.nativeElement.getContext('2d');
    if (!ctxBarras) return;
    const datosAgrupados = this.agruparYContarPorEmail(filtradas);
    const etiquetasEjeX = Object.keys(datosAgrupados);
    const etiquetasEjeY = Object.values(datosAgrupados);
    
    this.miGraficoBarra = new Chart(ctxBarras, {
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
