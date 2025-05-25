import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-postularse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postularse.component.html',
  styleUrls: ['./postularse.component.css']
})
export class PostularseComponent {
  brigadas: string[] = [
    'Brigada Ambiental Norte',
    'Brigada Forestal Sur',
    'Brigada de Biodiversidad',
    'Brigada Urbana Centro'
  ];

  cargos: string[] = [
    'Coordinador',
    'Botánico',
    'Zoologista',
    'Voluntario General'
  ];

  brigadaSeleccionada = '';
  cargoSeleccionado = '';

guardarPostulacion() {
  if (this.brigadaSeleccionada && this.cargoSeleccionado) {
    Swal.fire({
      icon: 'success',
      title: 'Postulación exitosa',
      html: `✅ Te has postulado a la brigada <strong>${this.brigadaSeleccionada}</strong> como <strong>${this.cargoSeleccionado}</strong>.`,
      confirmButtonText: 'Cerrar',
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Por favor seleccione una brigada y un cargo.'
    });
  }
}
}
