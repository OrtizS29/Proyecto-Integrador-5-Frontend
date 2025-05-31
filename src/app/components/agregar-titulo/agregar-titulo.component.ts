import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TituloService } from '../../services/tituloService';
import { Titulos } from '../../models/titulos';

@Component({
  selector: 'app-agregar-titulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-titulo.component.html',
  styleUrls: ['./agregar-titulo.component.css']
})
export class AgregarTituloComponent {
  titulo: string = '';
  nivelEscolaridad: string = '';
  docBrigadista: number = 12345678; // ← Reemplazar con el documento real (puede venir de auth o route)

  constructor(private tituloService: TituloService, private router: Router) {}

  guardarTitulo(): void {
    if (!this.titulo.trim() || !this.nivelEscolaridad.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevoTitulo: Titulos = {
      id: 0,
      Titulo: this.titulo,
      Nivel_Escolaridad: this.nivelEscolaridad,
      Doc_Brigadista: this.docBrigadista
    };

    this.tituloService.crearTitulo(nuevoTitulo).subscribe({
      next: () => {
        alert('Título creado exitosamente');
        this.router.navigate(['/admin/brigadista-titulo']);
      },
      error: (err) => {
        console.error('Error al guardar título:', err);
        alert('Hubo un error al guardar el título');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/brigadista-titulo']);
  }
}
