import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostulacionService } from '../../services/postulacionService';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-postulaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-postulaciones.component.html',
  styleUrl: './gestion-postulaciones.component.css'
})
export class GestionPostulacionesComponent{

  postulaciones: {
    cargo: string;
    estado: string;
    nombreBrigadista: string;
    nombreBrigada: string;
  }[] = [];

  seleccionada: any = null;

  constructor(private route: ActivatedRoute, private postulacionService: PostulacionService) {}

  ngOnInit(): void {
    const idBrigada = Number(this.route.snapshot.paramMap.get("idBrigada"));
    if(idBrigada){
      this.postulacionService.buscarPostulacionPorBrigada(idBrigada).subscribe({
        next: (data) => {
          this.postulaciones = data.map((p: any) => ({
            cargo: p.cargo,
            estado: p.estado,
            nombreBrigadista: `${p.Brigadista?.Nombre ?? 'N/A'} ${p.Brigadista?.Apellido ?? ''}`,
            nombreBrigada: p.Brigada?.Nombre ?? 'N/A'
          }));
        },
         error: (err) => {
          console.error("Error al obtener postulaciones", err);
          Swal.fire("Error", "No se pudieron cargar las postulaciones", "error");
        }
      });
    }
  }

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
