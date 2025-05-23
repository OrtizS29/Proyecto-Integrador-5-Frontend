import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  mostrarModal = false;

  guardarPostulacion() {
    if (this.brigadaSeleccionada && this.cargoSeleccionado) {
      this.mostrarModal = true;
    } else {
      alert('Por favor seleccione una brigada y un cargo.');
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
