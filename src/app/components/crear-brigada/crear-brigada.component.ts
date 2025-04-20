import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-crear-brigada',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule
  ],
  templateUrl: './crear-brigada.component.html',
  styleUrls: ['./crear-brigada.component.css']
})
export class CrearBrigadaComponent {
  constructor(private router: Router) {}

  nombreBrigada: string = '';
  municipio: string = '';
  fechaInicio: Date | null = null;

  cantidadIntegrantes: number = 6;

  integrantes: { persona: Brigadista | null; rol: string }[] = Array.from({ length: 6 }, () => ({
    persona: null,
    rol: ''
  }));

  mensajeError: string = '';

  // Ejemplo de brigadistas disponibles
  brigadistasDisponibles: Brigadista[] = [
    { id: 1, nombre: 'Carlos', apellido: 'López' },
    { id: 2, nombre: 'María', apellido: 'Gómez' },
    { id: 3, nombre: 'Luis', apellido: 'Martínez' },
    { id: 4, nombre: 'Ana', apellido: 'Rodríguez' },
    { id: 5, nombre: 'Pedro', apellido: 'Pérez' },
  ];

  rolesDisponibles: string[] = [
    'Coordinador Senior',
    'Coordinador Junior',
    'Ingeniero forestal',
    'Biólogo o profesional botánico',
    'Coordinador logístico',
    'Responsable frente de trabajo',
    'Auxiliar forestal',
    'Dendrólogo'
  ];

  actualizarIntegrantes(): void {
    const cantidad = this.cantidadIntegrantes;

    if (cantidad < 6 || cantidad > 10) {
      this.mensajeError = 'El número de integrantes debe estar entre 6 y 10.';
      return;
    }

    this.mensajeError = '';

    if (cantidad > this.integrantes.length) {
      for (let i = this.integrantes.length; i < cantidad; i++) {
        this.integrantes.push({ persona: null, rol: '' });
      }
    } else if (cantidad < this.integrantes.length) {
      this.integrantes = this.integrantes.slice(0, cantidad);
    }
  }

  guardarBrigada(): void {
    if (!this.nombreBrigada || !this.municipio || !this.fechaInicio) {
      this.mensajeError = 'Por favor, completa todos los campos principales.';
      return;
    }

    const camposIncompletos = this.integrantes.some(integ => !integ.persona || !integ.rol);
    if (camposIncompletos) {
      this.mensajeError = 'Todos los integrantes deben tener persona y rol asignado.';
      return;
    }

    this.mensajeError = '';

    const brigada = {
      nombre: this.nombreBrigada,
      municipio: this.municipio,
      fechaInicio: this.fechaInicio,
      integrantes: this.integrantes
    };

    console.log('✅ Brigada guardada:', brigada);

    this.router.navigate(['/admin/brigadas']);
  }

  cancelar(): void {
    this.router.navigate(['/admin/brigadas']);
  }
}

// Interfaz sugerida
interface Brigadista {
  id: number;
  nombre: string;
  apellido: string;
}

