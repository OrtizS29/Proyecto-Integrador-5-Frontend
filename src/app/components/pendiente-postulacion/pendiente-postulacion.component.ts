import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pendiente-postulacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pendiente-postulacion.component.html',
  styleUrls: ['./pendiente-postulacion.component.css']
})
export class PendientePostulacionComponent {
  historialBrigadas = [
    { nombre: 'Brigada Ambiental Norte', municipio: 'Medellín', cargo: 'Botánico', fecha: '2024-06-15' },
    { nombre: 'Brigada Forestal Sur', municipio: 'Cali', cargo: 'Coordinador', fecha: '2023-09-01' },
    { nombre: 'Brigada de Biodiversidad', municipio: 'Bogotá', cargo: 'Voluntario General', fecha: '2022-12-10' },
    { nombre: 'Brigada Urbana Centro', municipio: 'Barranquilla', cargo: 'Zoologista', fecha: '2021-04-20' }
  ];

  filaSeleccionada: number | null = null;

  seleccionarFila(index: number) {
    this.filaSeleccionada = index === this.filaSeleccionada ? null : index;
  }

  cancelarPostulacion() {
    if (this.filaSeleccionada !== null) {
      const confirmacion = confirm(`¿Estás seguro de cancelar tu postulación a "${this.historialBrigadas[this.filaSeleccionada].nombre}"?`);
      if (confirmacion) {
        this.historialBrigadas.splice(this.filaSeleccionada, 1);
        this.filaSeleccionada = null;
      }
    }
  }
}
