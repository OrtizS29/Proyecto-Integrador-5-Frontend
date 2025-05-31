import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloService } from '../../services/tituloService';
import { Titulos } from '../../models/titulos';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brigadista-titulo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './brigadista-titulo.component.html',
  styleUrls: ['./brigadista-titulo.component.css']
})
export class BrigadistaTituloComponent implements OnInit {
  titulos: Titulos[] = [];
  cargando: boolean = true;
  error: string = '';
  tituloSeleccionado: Titulos | null = null;

  constructor(private tituloService: TituloService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarTitulos();
  }

  cargarTitulos(): void {
    this.cargando = true;
    this.tituloService.obtenerTodos().subscribe({
      next: (data) => {
        this.titulos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar títulos';
        this.cargando = false;
      }
    });
  }

  seleccionarFila(titulo: Titulos): void {
    this.tituloSeleccionado = titulo;
  }

  editarTitulo(): void {
    if (this.tituloSeleccionado) {
      this.router.navigate(['/admin/editar-titulo', this.tituloSeleccionado.id]);
    }
  }

  eliminarTitulo(): void {
    if (!this.tituloSeleccionado) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el título seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tituloService.eliminarTitulo(this.tituloSeleccionado!.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Título eliminado correctamente.',
              confirmButtonText: 'Aceptar'
            });
            this.tituloSeleccionado = null;
            this.cargarTitulos();
          },
          error: (err) => {
            console.error('Error al eliminar título:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el título.',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
}
