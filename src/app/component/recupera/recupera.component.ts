import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recupera',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recupera.component.html',
  styleUrls: ['./recupera.component.scss'] // ← nota: debe ser style**Urls**
})
export class RecuperaComponent {
  form: FormGroup;
  isSubmitting = false;
  mensaje: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      const email = this.form.value.email;

      // Simula un envío al backend
      setTimeout(() => {
        this.mensaje = `Se ha enviado un enlace de recuperación a ${email}`;
        this.error = '';
        this.isSubmitting = false;
      }, 1000);
    } else {
      this.form.markAllAsTouched();
    }
  }

  volver(): void {
    this.router.navigate(['/login']);
  }
}
