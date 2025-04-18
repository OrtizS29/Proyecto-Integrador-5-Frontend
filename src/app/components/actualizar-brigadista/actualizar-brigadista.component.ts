// actualizar-brigadista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrigadistaDataService } from '../../services/brigadista-data.service';
import { Brigadista } from './../../models/brigadista';
import { Router } from '@angular/router';
import { BrigadistaService } from '../../services/brigadistaService';


@Component({
  selector: 'app-actualizar-brigadista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-brigadista.component.html',
  styleUrls: ['./actualizar-brigadista.component.css']
})
export class ActualizarBrigadistaComponent implements OnInit {
  // Inicializo como objeto vacío; luego viene la data del servicio o localStorage
  brigadista: Brigadista = {} as Brigadista;

  constructor(
    private brigadistaService: BrigadistaDataService,
    private apiService: BrigadistaService, // <-- Agregado aquí
    public router: Router
  ) {}

  ngOnInit(): void {
    this.brigadistaService.brigadista$.subscribe(data => {
      if (data) {
        this.brigadista = data;
      } else {
        const local = localStorage.getItem('brigadistaSeleccionado');
        if (local) {
          this.brigadista = JSON.parse(local);

          this.brigadista.Fecha_Expedicion_Documento = this.formatearFecha(this.brigadista.Fecha_Expedicion_Documento);
          this.brigadista.Fecha_Nacimiento = this.formatearFecha(this.brigadista.Fecha_Nacimiento);

          this.brigadistaService.setBrigadista(this.brigadista);
        } else {
          alert('No se ha seleccionado ningún brigadista.');
          this.router.navigate(['/admin/personal']);
        }
      }
    });
  }

  formatearFecha(fecha: string): string {
    const partes = fecha.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    }
    return fecha;
  }

  guardarCambios() {
    if (this.brigadista && this.brigadista.Numero_Documento) {
      const brigadistaActualizado = { ...this.brigadista }; // Clonamos el objeto para no afectar el original
  
      // Convertimos las fechas solo si existen
      if (brigadistaActualizado.Fecha_Nacimiento) {
        brigadistaActualizado.Fecha_Nacimiento = new Date(brigadistaActualizado.Fecha_Nacimiento).toISOString();
      }
      if (brigadistaActualizado.Fecha_Expedicion_Documento) {
        brigadistaActualizado.Fecha_Expedicion_Documento = new Date(brigadistaActualizado.Fecha_Expedicion_Documento).toISOString();
      }
  
      this.apiService.actualizarBrigadista(
        brigadistaActualizado.Numero_Documento,
        brigadistaActualizado
      ).subscribe({
        next: (respuesta) => {
          console.log('Actualizado correctamente:', respuesta);
          alert('Brigadista actualizado exitosamente.');
          this.router.navigate(['/admin/personal']);
        },
        error: (error) => {
          console.error('Error al actualizar el brigadista:', error);
          alert('Ocurrió un error al guardar los cambios.');
        }
      });
    } else {
      alert('Datos incompletos del brigadista.');
    }
  }
  
  
}
