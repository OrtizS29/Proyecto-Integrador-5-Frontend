import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NovedadesService } from '../../services/novedadesService';
import { BrigadaService } from '../../services/brigadaService';
import { Novedad } from '../../models/novedades';
import { Brigada } from '../../models/brigada';

@Component({
  selector: 'app-actualizar-novedad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-novedad.component.html',
  styleUrls: ['./actualizar-novedad.component.css']
})
export class ActualizarNovedadComponent implements OnInit {
  novedad: Novedad = {
    id: 0,
    actividad: '',
    descActividad: '',
    idBrigada: 0
  };

  brigadas: Brigada[] = [];

  constructor(
    private novedadesService: NovedadesService,
    private brigadaService: BrigadaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.novedadesService.obtenerNovedades().subscribe((novedadesRaw: any[]) => {
          const encontrada = novedadesRaw.find((n) => n.id === Number(id));
          if (encontrada) {
            this.novedad = {
              id: encontrada.id,
              actividad: encontrada.Actividad,
              descActividad: encontrada.Desc_Actividad,
              idBrigada: encontrada.Id_Brigada
            };
          }
        });
      }
    });


    this.brigadaService.obtenerTodos().subscribe({
      next: (res: Brigada[]) => {
        this.brigadas = res;
      },
      error: (err) => {
        console.error('Error al cargar brigadas:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las brigadas'
        });
      }
    });
  }

  actualizarNovedad(): void {
    const payload = {
      Actividad: this.novedad.actividad,
      Desc_Actividad: this.novedad.descActividad,
      Id_Brigada: Number(this.novedad.idBrigada)
    };

    this.novedadesService.actualizarNovedad(this.novedad.id, payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'La novedad fue actualizada correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/admin/novedades']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la novedad'
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/novedades']);
  }
}
