import { Component, OnInit } from '@angular/core';
import { NovedadesService } from '../../services/novedadesService';
import { BrigadaService } from '../../services/brigadaService';
import { Novedad } from '../../models/novedades';
import { Brigada } from '../../models/brigada';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // ya está incluido

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, HttpClientModule, RouterModule],
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  novedades: Novedad[] = [];
  brigadas: Brigada[] = [];
  novedadSeleccionada: Novedad | null = null;

  constructor(
    private novedadesService: NovedadesService,
    private brigadaService: BrigadaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.novedadesService.obtenerNovedades().subscribe((novedadesRaw: any[]) => {
      this.novedades = novedadesRaw.map(n => ({
        id: n.id,
        actividad: n.Actividad,
        descActividad: n.Desc_Actividad,
        idBrigada: n.Id_Brigada
      }));
    });

    this.brigadaService.obtenerTodos().subscribe((brigadas) => {
      this.brigadas = brigadas;
    });
  }

  cargarDatos(): void {
    this.novedadesService.obtenerNovedades().subscribe((novedadesRaw: any[]) => {
      this.novedades = novedadesRaw.map(n => ({
        id: n.id,
        actividad: n.Actividad,
        descActividad: n.Desc_Actividad,
        idBrigada: n.Id_Brigada
      }));
    });

    this.brigadaService.obtenerTodos().subscribe((brigadas) => {
      this.brigadas = brigadas;
    });
  }


  seleccionarNovedad(novedad: Novedad): void {
    this.novedadSeleccionada = novedad;
  }

  obtenerNombreBrigada(idBrigada: number): string {
    const brigada = this.brigadas.find(b => b.id === idBrigada);
    return brigada ? brigada.Nombre : 'Desconocida';
  }

  actualizarSeleccionada(): void {
    if (!this.novedadSeleccionada) return;

    // Puedes cambiar esta ruta luego
    this.router.navigate(['/admin/novedades'], {
      queryParams: { id: this.novedadSeleccionada.id }
    });
  }

  eliminarSeleccionada(): void {
    if (!this.novedadSeleccionada) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la novedad seleccionada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.novedadesService.eliminarNovedad(this.novedadSeleccionada!.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminada',
              text: 'La novedad fue eliminada correctamente',
              timer: 2000,
              showConfirmButton: false
            });
            this.novedadSeleccionada = null;
            this.cargarDatos();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la novedad'
            });
          }
        });
      }
    });
  }
}
