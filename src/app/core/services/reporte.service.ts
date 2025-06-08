// reporte.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private STORAGE_KEY = 'reportes';

  obtenerReportes(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  agregarReporte(reporte: { nombre: string; fecha: Date; descripcion: string }): void {
    const reportes = this.obtenerReportes();
    reportes.push(reporte);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reportes));
  }

  // Opcional: para borrar reportes
  eliminarReporte(nombre: string): void {
    const reportes = this.obtenerReportes().filter(r => r.nombre !== nombre);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reportes));
  }
}
