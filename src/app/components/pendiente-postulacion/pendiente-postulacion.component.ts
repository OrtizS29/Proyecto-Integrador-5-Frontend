import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../services/postulacionService';

interface HistorialBrigada {
  id: number;
  nombre: string;
  municipio: string;
  cargo: string;
  fecha: string;
}

@Component({
  selector: 'app-pendiente-postulacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pendiente-postulacion.component.html',
  styleUrls: ['./pendiente-postulacion.component.css']
})
export class PendientePostulacionComponent {
  historialBrigadas: HistorialBrigada[]= [];
  filaSeleccionada: number | null = null;

  constructor(private postulacionService: PostulacionService) {}

  ngOnInit(): void {
    const idBrigadista = 900200003; // Puedes luego obtener esto desde un servicio de login
    console.log("📦 Iniciando carga de postulaciones");

    this.postulacionService.buscarPostulacionPorId(idBrigadista).subscribe({
      next: (data) => {
        console.log("✅ Respuesta de postulaciones:", data);
        // Mapeamos la respuesta para adaptarla a lo que espera el HTML
        this.historialBrigadas = data.map((item: any) => ({
          id: item.id,
          nombre: item.Brigada.Nombre,
          municipio: item.Brigada.Municipio?.Nombre ?? 'Desconocido',
          cargo: item.cargo,
          fecha: item.Brigada.Fecha_Inicio.split('T')[0]
        }));
      },
      error: (err:any) => {
        console.error('Error cargando postulaciones:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las postulaciones.'
        });
      }
    });
  }


  seleccionarFila(index: number) {
    this.filaSeleccionada = index === this.filaSeleccionada ? null : index;
  }

cancelarPostulacion() {
  if (this.filaSeleccionada !== null) {
    const brigada = this.historialBrigadas[this.filaSeleccionada];
    const id = brigada.id;

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
        // Llamar al servicio solo si el usuario confirma
        this.postulacionService.eliminarPostulacion(id).subscribe({
          next: () => {
            // Eliminar de la vista
            this.historialBrigadas.splice(this.filaSeleccionada!, 1);
            this.filaSeleccionada = null;

            Swal.fire({
              icon: 'success',
              title: 'Postulación cancelada',
              text: `Tu postulación a "${brigada.nombre}" ha sido cancelada.`
            });
          },
          error: (err) => {
            console.error('Error al eliminar postulación:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo cancelar la postulación.'
            });
          }
        });
      }
    });
  }
}


}
