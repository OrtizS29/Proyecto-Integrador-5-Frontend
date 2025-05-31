import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NovedadesService } from '../../services/novedadesService';
import { BrigadaService } from '../../services/brigadaService';
import { Novedad } from '../../models/novedades';
import { Brigada } from '../../models/brigada';

@Component({
  selector: 'app-agregar-novedad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.css']
})
export class AgregarNovedadComponent implements OnInit {
  novedad: Omit<Novedad, 'id'> = {
    actividad: '',
    descActividad: '',
    idBrigada: 0
  };

  brigadas: Brigada[] = [];

  constructor(
    private novedadesService: NovedadesService,
    private brigadaService: BrigadaService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  guardarNovedad(): void {
    const payload = {
      Actividad: this.novedad.actividad,
      Desc_Actividad: this.novedad.descActividad,
      Id_Brigada: Number(this.novedad.idBrigada)
    };

    this.novedadesService.crearNovedad(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Novedad guardada exitosamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/admin/novedades']);
      },
      error: (error) => {
        console.error('Error del backend:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar la novedad'
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/novedades']);
  }
}
