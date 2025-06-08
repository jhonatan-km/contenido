import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../core/services/reporte.service';

@Component({
  selector: 'app-reportes',
  standalone: true, // 👈 importante
  imports: [CommonModule], // 👈 necesario para *ngFor, *ngIf, date
   templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
  
export class ReportesComponent implements OnInit {
  reportes: any[] = [];
getIcono: any;

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reportes = this.reporteService.obtenerReportes();
  }

  descargarSimulacion(nombre: string): void {
    alert(`Descargando ${nombre}\n(Nota: Esto simula la descarga. Para guardar el PDF real, necesitarías un backend)`);
  }

  eliminarReporte(reporte: any) {
  this.reportes = this.reportes.filter(r => r !== reporte);
}

confirmarEliminar(reporte: any) {
  const confirmar = confirm(`¿Estás seguro de que quieres eliminar el reporte "${reporte.nombre}"?`);
  if (confirmar) {
    this.eliminarReporte(reporte);
  }
}


}
