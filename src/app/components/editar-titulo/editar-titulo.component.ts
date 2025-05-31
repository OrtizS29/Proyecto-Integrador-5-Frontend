import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TituloService } from '../../services/tituloService';
import { Titulos } from '../../models/titulos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-titulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-titulo.component.html',
  styleUrls: ['./editar-titulo.component.css']
})
export class EditarTituloComponent implements OnInit {

  titulo: Titulos = {
    id: 0,
    Titulo: '',
    Nivel_Escolaridad: '',
    Doc_Brigadista: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tituloService: TituloService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.tituloService.obtenerTituloPorId(id).subscribe({
        next: (data) => this.titulo = data,
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar',
            text: 'No se pudo cargar el título.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/admin/brigadista-titulo']);
          });
        }
      });
    }
  }

  guardarCambios(): void {
    const datosActualizados = {
      Titulo: this.titulo.Titulo,
      Nivel_Escolaridad: this.titulo.Nivel_Escolaridad,
      Doc_Brigadista: this.titulo.Doc_Brigadista
    };

    this.tituloService.actualizartitulo(this.titulo.id, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El título fue actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/admin/brigadista-titulo']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Ocurrió un error al guardar los cambios.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/brigadista-titulo']);
  }
}
