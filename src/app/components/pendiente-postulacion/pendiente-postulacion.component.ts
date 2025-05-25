import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


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
    const brigada = this.historialBrigadas[this.filaSeleccionada];

    Swal.fire({
      title: '¿Cancelar postulación?',
      text: `¿Estás seguro de cancelar tu postulación a "${brigada.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.historialBrigadas.splice(this.filaSeleccionada!, 1);
        this.filaSeleccionada = null;

        Swal.fire({
          icon: 'success',
          title: 'Postulación cancelada',
          text: `Tu postulación a "${brigada.nombre}" ha sido cancelada.`
        });
      }
    });
  }
}

}
