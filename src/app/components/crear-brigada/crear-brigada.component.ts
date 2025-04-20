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

  rolesDisponibles: string[] = [
    'Coordinador Senior',
    'Coordinador Junior',
    'Ingeniero forestal',
    'Biólogo o profesional botánico',
    'Coordinador logistico',
    'Responsable frente de trabajo',
    'Auxiliar forestal',
    'Dendrólogo'
  ];

  cantidadIntegrantes: number = 6;
  integrantes: { nombre: string; rol: string }[] = Array.from({ length: 6 }, () => ({ nombre: '', rol: '' }));
  mensajeError: string = '';
  
  actualizarIntegrantes() {
    const cantidad = this.cantidadIntegrantes;
    if (cantidad < 6 || cantidad > 10) {
      this.mensajeError = 'El número de integrantes debe estar entre 6 y 10.';
      return;
    }

    this.mensajeError = '';
    if (cantidad > this.integrantes.length) {
      for (let i = this.integrantes.length; i < cantidad; i++) {
        this.integrantes.push({ nombre: '', rol: '' });
      }
    } else {
      this.integrantes = this.integrantes.slice(0, cantidad);
    }
  }

  guardarBrigada() {
    console.log('Guardando brigada...');
    console.log('Nombre:', this.nombreBrigada);
    console.log('Municipio:', this.municipio);
    console.log('Fecha de inicio:', this.fechaInicio);
    console.log('Integrantes:', this.integrantes);
    // Aquí iría tu lógica para enviar los datos
  }

  cancelar() {
    this.router.navigate(['/admin/brigadas']);
  }
}
