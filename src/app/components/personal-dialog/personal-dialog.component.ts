import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BrigadistaService } from '../../services/brigadistaService';
import { Brigada } from '../../models/brigada';
import { Municipio } from '../../models/municipio';

@Component({
  selector: 'app-personal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './personal-dialog.component.html',
  styleUrl: './personal-dialog.component.css'
})
export class PersonalDialogComponent implements OnInit {
  nombreBrigada: string = '';
  municipioBrigada: string = '';
  personalAsignado: { nombreCompleto: string, rol: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, nombre: string, municipio: Municipio },
    private brigadistaService: BrigadistaService
  ) {}

  ngOnInit(): void {
    this.nombreBrigada = this.data.nombre;

    // Verificamos si el municipio es un objeto y sacamos solo el nombre
    if (typeof this.data.municipio === 'object' && this.data.municipio !== null) {
      this.municipioBrigada = this.data.municipio.Nombre || 'Sin nombre';
    } else {
      this.municipioBrigada = this.data.municipio; // fallback si ya es string
    }

    this.brigadistaService.obtenerBrigadistasPorBrigada(this.data.id).subscribe({
      next: (brigadistas) => {
        this.personalAsignado = brigadistas.map((b: any) => ({
          nombreCompleto: `${b.Nombre} ${b.Apellido}`,
          rol: b.Cargo
        }));
      },
      error: (error) => {
        console.error('Error al obtener personal asignado:', error);
      }
    });
  }

}
