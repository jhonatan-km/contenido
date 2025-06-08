import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReporteService } from '../../core/services/reporte.service';

@Component({
  selector: 'app-curriculum-form-page-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
     <div class="container" id="pdf-content">
  <header class="header-section">
    <h1 class="main-title">PLAN DE SESIÓN (Semana 1)</h1>
    <h3 class="subtitle">Contenido Curricular - Programa de Formación Profesional</h3>
  </header>

  <section class="info-grid">
    <div class="info-column">
      <h4>Zonal:</h4>
      <p>Ica - Ayacucho</p>

      <h4>Instructor:</h4>
      <p>JHONATAN SAUÑE PICHARDO</p>

      <h4>Semestre:</h4>
      <p>VI</p>

      <h4>Tema:</h4>
      <p>CAPÍTULO 1 - Razón Social, Misión, Visión, Objetivos, Valores de la Empresa</p>
    </div>

    <div class="info-column">
      <h4>CPF/Escuela:</h4>
      <p>Ayacucho</p>

      <h4>Carrera:</h4>
      <p>Ing. de Software con Inteligencia Artificial</p>

      <h4>Curso/Módulo:</h4>
      <p>Mejora de Métodos en el Trabajo</p>

      <h4>Objetivo:</h4>
      <p>Enmarcar el ámbito de estudio de la empresa donde se realizará el proyecto de investigación</p>
    </div>
  </section>

  <table>
    <thead>
      <tr>
        <th>Tiempo (minutos)</th>
        <th>Actividades / Pasos a seguir</th>
        <th>Prevención de Ayudas</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>15</td>
        <td>
          Motivación (Dar a conocer objetivos)
          <ul>
            <li>Ubicación del ambiente de aprendizaje: Saludo e indicaciones generales.</li>
            <li>Conexión con la clase anterior</li>
            <li>Presentación de sesión en plataforma Blackboard</li>
          </ul>
        </td>
        <td>
          <strong>Estrategias:</strong>
          <ul>
            <li>Experiencia directa</li>
            <li>Exploración reflexiva</li>
            <li>Otros</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>60</td>
        <td>
          Desarrollo del tema
          <ul>
            <li>Razón Social, Visión, Objetivos, Valores de la empresa</li>
            <li>Uso de medios didácticos</li>
            <li>Análisis de casos</li>
          </ul>
        </td>
        <td>
          <strong>Medios Didácticos:</strong>
          <ul>
            <li>Pizarra</li>
            <li>Presentaciones</li>
            <li>Documentos</li>
            <li>Otros</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>15</td>
        <td>
          Evaluación - Acciones de reforzamiento y conclusiones
          <ul>
            <li>Resumen de los principales conceptos abordados</li>
            <li>Interrogantes y reflexiones finales</li>
          </ul>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="button-container">
  <button (click)="editarContenido()">Editar</button>
  <button (click)="regresar()">Regresar</button>
  <button (click)="generatePDF()">Generar PDF</button>
</div>


  `,
styles: [`
  .container {
    background: white;
    padding: 30px 40px;
    margin: 0 auto;
    max-width: 800px;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    color: #222;
    box-shadow: 0 0 0 transparent; /* sin sombra si es PDF */
  }

  /* Encabezado */
  .header-section {
    text-align: center;
    margin-bottom: 20px;
  }

  .main-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .subtitle {
    font-size: 16px;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 10px;
  }

  /* Información general */
  .info-grid {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .info-column {
    flex: 1;
  }

  h4 {
    margin: 10px 0 5px;
    font-size: 14px;
    color: #000;
  }

  p {
    margin: 0 0 10px;
    font-size: 13px;
    color: #333;
  }

  /* Tabla */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    table-layout: fixed;
    word-wrap: break-word;
  }

  th, td {
    border: 1px solid #000;
    padding: 8px 10px;
    vertical-align: top;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  /* Listas dentro de celdas */
  ul {
    margin: 5px 0 0 15px;
    padding-left: 0;
  }

  strong {
    display: block;
    margin-bottom: 5px;
  }

  /* Botones (en pantalla) */
  .button-container {
  display: flex;
  gap: 15px;
  justify-content: center; /* Centra los botones horizontalmente */
  margin: 20px 0;
}

.button-container button {
  background-color: #1c3ae6; /* Azul Sakay Angular */
  color: white;
  border: none;
  padding: 0.65rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(28, 58, 230, 0.35);
  transition: 
    background-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

.button-container button:hover {
  background-color: #2e4de7;
  box-shadow: 0 8px 20px rgba(46, 77, 231, 0.6);
  transform: translateY(-3px) scale(1.07);
}

.button-container button:focus {
  outline: 3px solid #7a9bff;
  outline-offset: 3px;
}

.button-container button:active {
  transform: scale(0.95);
  background-color: #1830b0;
  color: #e0e7ff;
}

`]

})
export class CurriculumFormPageTwoComponent implements OnInit {
  curriculumFormTwo: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // ✅ Inyectar ruta activa
    private reporteService: ReporteService
  ) {
    this.curriculumFormTwo = this.fb.group({
      carrera: [{ value: '', disabled: true }],
      nivel: [{ value: '', disabled: true }],
      curso: [{ value: '', disabled: true }],
      semestre: [{ value: '', disabled: true }],
      contenido: this.fb.array([])
    });

    this.addRow();
  }

  ngOnInit(): void {}

  get contenidoArray(): FormArray {
    return this.curriculumFormTwo.get('contenido') as FormArray;
  }

  addRow(): void {
    const newRow = this.fb.group({
      horas: [''],
      objetivosEspecificos: [''],
      conocimientos: [''],
      practicasActividades: [''],
      formacionVirtual: ['']
    });
    this.contenidoArray.push(newRow);
  }

  updateForm(): void {
    console.log('Formulario actualizado', this.curriculumFormTwo.value);
  }

  previousPage(): void {
    this.router.navigate(['../'], { relativeTo: this.route }); // ✅ Ir a ruta padre (contenido-curricular)
  }

  editarContenido(): void {
    this.router.navigate(['../'], { relativeTo: this.route }); // ✅ Igual que regresar
  }

  regresar(): void {
    this.router.navigate(['../'], { relativeTo: this.route }); // ✅ Igual que editar
  }

  generatePDF(): void {
    const content = document.getElementById('pdf-content');
    if (!content) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    html2canvas(content, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const maxWidth = 190;
      const scaleRatio = maxWidth / canvasWidth;
      const imgWidth = maxWidth;
      const imgHeight = canvasHeight * scaleRatio;

      const positionX = (pageWidth - imgWidth) / 2;
      const positionY = 10;

      pdf.addImage(imgData, 'PNG', positionX, positionY, imgWidth, imgHeight);

      const fileName = `Plan_Sesion_${new Date().getTime()}.pdf`;

      this.reporteService.agregarReporte({
        nombre: fileName,
        fecha: new Date(),
        descripcion: 'Plan de sesión generado automáticamente'
      });

      pdf.save(fileName);
    }).catch(error => {
      console.error('Error al generar el PDF:', error);
    });
  }
}
