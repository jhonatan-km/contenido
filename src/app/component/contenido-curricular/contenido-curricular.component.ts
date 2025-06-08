import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculum-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
 <div class="container">
  <div class="main-content">
    <!-- FORMULARIO -->
    <div class="formulario encabezado-flex">
      <img src="assets/logp.webp" alt="SENATI" class="small-logo" />

      <div class="titulos-contenedor">
        <p class="calidad-total">DISEÑO Y DESARROLLO DE SOLUCIONES IOT</p>
        <h2>CONTENIDO CURRICULAR</h2>
        <h3>PROGRAMA DE FORMACIÓN PROFESIONAL</h3>

        <form [formGroup]="curriculumForm" (ngSubmit)="onSubmit()">

          <!-- Info Table -->
          <table class="info-table">
            <tr>
              <td><strong>Escuela:</strong></td>
              <td>
                <select formControlName="carrera">
                  <option value="" disabled selected>Selecciona una carrera</option>
                  <option value="DesarrolloWeb">Desarrollo Web</option>
                  <option value="IoT">IoT</option>
                  <option value="Redes">Redes</option>
                  <option value="BaseDeDatos">Base de Datos</option>
                </select>
              </td>
              <td><strong>Modulo Formativo:</strong></td>
              <td>
                <select formControlName="curso">
                  <option value="" disabled selected>Selecciona un curso</option>
                  <option value="Introduccion">Introducción a la Tecnología</option>
                  <option value="Avanzado">Curso Avanzado de Desarrollo</option>
                  <option value="Práctico">Curso Práctico de Redes</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><strong>Nivel:</strong></td>
              <td>
                <select formControlName="nivel">
                  <option value="" disabled selected>Selecciona el nivel</option>
                  <option value="TecnicoOperativo">Técnico Operativo</option>
                  <option value="ProfesionalTecnico">Profesional Técnico</option>
                </select>
              </td>
              <td><strong>Docente :</strong></td>
              <td>
                <select formControlName="semestre">
                  <option value="" disabled selected>Selecciona un docente</option>
                  <option value="Perez">Ing. Juan Perez</option>
                  <option value="Romero">Ing. Carla Romero</option>
                  <option value="Quispe">Ing. Luis Quispe</option>
                </select>
              </td>
            </tr>
            
          </table>

          <!-- Contenido Table -->
          <table class="content-table">
            <thead>
              <tr>
                <th rowspan="2">SEM (SEMANA)</th>
                <th colspan="3">HORAS</th>
                <th rowspan="2">PROYECTOS TAREAS DE APRENDIZAJE</th>
                <th colspan="4">CONTENIDOS DE APRENDIZAJE</th>
                <th></th>
              </tr>
              <tr>
                <th>T</th>
                <th>P</th>
                <th>A</th>
                <th>OPERACIONES</th>
                <th>CONOCIMIENTOS TECNOLÓGICOS</th>
                <th>CONOCIMIENTOS COMPLEMENTARIOS</th>
                <th>AUTOESTUDIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody formArrayName="contenido">
              <tr *ngFor="let item of contenidoArray.controls; let i = index" [formGroupName]="i">
                <td><input type="number" formControlName="semana" class="hours-input" placeholder="Semana" /></td>
                <td><input type="number" formControlName="horasT" class="hours-input" placeholder="T" /></td>
                <td><input type="number" formControlName="horasP" class="hours-input" placeholder="P" /></td>
                <td><input type="number" formControlName="horasA" class="hours-input" placeholder="A" /></td>
                <td><textarea formControlName="objetivosEspecificos" rows="4"></textarea></td>
                <td><textarea formControlName="operaciones" rows="4"></textarea></td>
                <td><textarea formControlName="conocimientosTecnologicos" rows="4"></textarea></td>
                <td><textarea formControlName="conocimientosComplementarios" rows="4"></textarea></td>
                <td class="autoestudio-cell"><textarea formControlName="autoestudio" rows="4"></textarea></td>

                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    (click)="removeRow(i)"
                    *ngIf="contenidoArray.length > 1"
                  >
                    X
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="buttons">
            <button type="button" (click)="addRow()">Agregar Fila</button>
            <button type="submit">Guardar archivo</button>
          </div>

          <div class="page-info">
            <img src="assets/logp.webp" alt="SENATI" class="small-logo" />
            <span>CONTENIDOS CURRICULARES</span>
            <span class="page-number">3</span>
          </div>
        </form>
      </div>
    </div>
  </div>
`,
  styles: [`
  .container {
  padding: 20px;
}

.main-content {
  display: flex;
  gap: 30px;
}

.dashboard {
  width: 280px;
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.formulario {
  flex: 1;
}

/* ======================= */
/* ===== Estilo TABLA ==== */
/* ======================= */
/* Tablas */
table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 2px solid #cfd8dc; /* Borde general de la tabla */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

/* Celdas */
th, td {
  padding: 12px 10px;
  border: 1px solid #b0bec5; /* Bordes internos más marcados */
  text-align: center;
  font-size: 0.95rem;
}

.content-table th {
  background-color: rgba(100, 100, 100, 0.3); 
 /* Gris plomo (ni muy claro ni muy oscuro) */
  color: white;              /* Contraste con el fondo */
  font-weight: bold;         /* Negrita */
  text-align: center;
  padding: 10px;
  border: 1px solid #3a3a3a;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-weight: bold; /* Aplica negrita a todo el texto de la tabla */
}

.content-table th {
  background-color: rgba(100, 100, 100, 0.2); /* Gris claro con transparencia */
  color: #000; /* Texto oscuro para contraste */
  text-align: center;
  padding: 10px;
  border: 1px solid #999; /* Bordes definidos */
}

.content-table td {
  padding: 8px;
  border: 1px solid #ccc;
  color: #000;
  font-weight: bold; /* Negrita también en las celdas */
  vertical-align: top;
}


/* Alternar color de filas para claridad */
.content-table tbody tr:nth-child(even) {
  background-color: #f5fafd;
}

.content-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

/* Inputs y Textareas */
input, textarea {
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Estilo general para la tabla de selección */
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: white;
}

/* ============================ */
/* ===== BOTONES GENERALES ==== */
/* ============================ */
button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.buttons button {
  background-color: #1c3ae6;
  color: white;
  padding: 0.65rem 1.6rem;
  margin-right: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(28, 58, 230, 0.35);
  transition: all 0.35s ease;
}

.buttons button:hover {
  background-color: #2e4de7;
  box-shadow: 0 8px 20px rgba(46, 77, 231, 0.6);
  transform: translateY(-3px) scale(1.07);
}

.buttons button:focus {
  outline: 3px solid #7a9bff;
  outline-offset: 3px;
}

.buttons button:active {
  transform: scale(0.95);
  background-color: #1830b0;
  color: #e0e7ff;
}

/* ============================ */
/* ===== BOTÓN ELIMINAR ======= */
/* ============================ */
.btn-danger {
  background-color: #ececec;     /* Fondo claro */
  color:rgb(61, 59, 59);                /* Rojo oscuro */
  border: 1px solidrgb(75, 71, 71);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;                /* Centrado horizontal */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.btn-danger:hover {
  background-color:rgb(104, 107, 110);
  color:rgb(240, 242, 243);
  transform: scale(1.07);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-danger:active {
  transform: scale(0.95);
  background-color: #e6c8c8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

/* ============================ */
/* ===== TARJETAS Y LAYOUT ==== */
/* ============================ */
.card-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card {
  background-color: #ffffff;
  border-left: 5px solid #007BFF;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
}

.card h4 {
  margin: 0 0 5px;
  font-size: 1rem;
  color: #333;
}

.card p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

/* ============================ */
/* ======== LOGOS & FOOTER ==== */
/* ============================ */
.logo1 {
  display: block;
  margin: auto;
  width: 100px;
  height: 100px;
}

.page-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.small-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  mix-blend-mode: multiply;
  background-color: transparent;
}

.footer-title {
  font-weight: bold;
  font-size: 1.1em;
  text-align: center;
  flex: 1;
}

.page-number {
  font-size: 1.2em;
  font-weight: bold;
}

.calidad-total {
  text-align: center;
  font-style: italic;
}

h2, h3 {
  text-align: center;
}

/* ============================ */
/* Autoestudio + íconos opcionales */
/* ============================ */
.autoestudio-cell {
  position: relative;
}

.autoestudio-cell textarea {
  padding-right: 30px;
}
.iot-header-row {
  display: flex;
  align-items: center;        /* Centra verticalmente */
  justify-content: center;    /* Centra horizontalmente todo el bloque */
  gap: 20px;                  /* Espacio entre logo y texto */
  margin-top: 40px;
  margin-bottom: 30px;
}

.iot-header-row .logo1 {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.calidad-total {
  font-size: 24px;
  font-style: italic;
  color: #2c3e50;
  margin: 0;
}
//


.titulos-contenedor {
  text-align: center;
  margin-top: 0;           /* Sin espacio arriba */
  padding-top: 5px;        /* Un poco de espacio justo encima para que no quede pegado al borde */
}

.calidad-total {
  margin: 0;               /* Elimina márgenes extra */
  font-style: normal;      /* Cambia si quieres quitar itálica */
  font-weight: 600;        /* Negrita ligera */
  font-size: 1.2rem;       /* Tamaño medio, ajusta si quieres más pequeño o más grande */
  color: #2c3e50;
  line-height: 1.2;
  padding-top: 0;
}

`]

})
export class CurriculumFormComponent {
  curriculumForm: FormGroup;
removeItem: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.curriculumForm = this.fb.group({
      carrera: [''],
      nivel: [''],
      curso: [''],
      semestre: [''],
      contenido: this.fb.array([])  // Array de filas
    });

    this.addRow();  // Agregar una fila por defecto
  }

  // ✅ Acceso al FormArray
  get contenidoArray(): FormArray {
    return this.curriculumForm.get('contenido') as FormArray;
  }

  // ✅ Agregar nueva fila
  addRow(): void {
    const newRow = this.fb.group({
      semana: [''],
      horasT: [''],
      horasP: [''],
      horasA: [''],
      objetivosEspecificos: [''],
      operaciones: [''],
      conocimientosTecnologicos: [''],
      conocimientosComplementarios: [''],
      autoestudio: ['']
    });

    this.contenidoArray.push(newRow);
  }

  removeRow(index: number): void {
  const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta fila?');
  if (confirmDelete) {
    this.contenidoArray.removeAt(index);
  }
}


  // ✅ Navegar a otra ruta
  goTo(path: string): void {
    this.router.navigate(['/' + path]);
  }

  // ✅ Enviar formulario
  onSubmit(): void {
    if (this.curriculumForm.valid) {
      console.log('Form Submitted', this.curriculumForm.value);
      localStorage.setItem('curriculumFormData', JSON.stringify(this.curriculumForm.value));
      this.router.navigate(['/contenido-curricular/page-two']);
    } else {
      alert('Por favor complete todos los campos');
    }
  }
}

