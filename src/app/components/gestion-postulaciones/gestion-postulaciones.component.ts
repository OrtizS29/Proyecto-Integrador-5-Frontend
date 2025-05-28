import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-postulaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-postulaciones.component.html',
  styleUrl: './gestion-postulaciones.component.css'
})
export class GestionPostulacionesComponent {

  postulaciones = [
    { cargo: 'Líder', estado: 'Pendiente', nombreBrigadista: 'Juan Pérez', nombreBrigada: 'Brigada Alfa' },
    { cargo: 'Miembro', estado: 'Pendiente', nombreBrigadista: 'Ana Torres', nombreBrigada: 'Brigada Beta' },
    { cargo: 'Miembro', estado: 'Pendiente', nombreBrigadista: 'Carlos Gómez', nombreBrigada: 'Brigada Gamma' },
    { cargo: 'Líder', estado: 'Pendiente', nombreBrigadista: 'María López', nombreBrigada: 'Brigada Delta' }
  ];

  seleccionada: any = null;

  seleccionar(postulacion: any): void {
    this.seleccionada = postulacion;
  }

  aprobar(): void {
    if (this.seleccionada) {
      Swal.fire({
        icon: 'success',
        title: 'Aprobado',
        text: `${this.seleccionada.nombreBrigadista} fue aprobado/a exitosamente`,
        timer: 2000,
        showConfirmButton: false
      });
      this.seleccionada.estado = 'Aprobado';
      this.seleccionada = null;
    }
  }

  rechazar(): void {
    if (this.seleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Rechazado',
        text: `${this.seleccionada.nombreBrigadista} fue rechazado/a`,
        timer: 2000,
        showConfirmButton: false
      });
      this.seleccionada.estado = 'Rechazado';
      this.seleccionada = null;
    }
  }

}
