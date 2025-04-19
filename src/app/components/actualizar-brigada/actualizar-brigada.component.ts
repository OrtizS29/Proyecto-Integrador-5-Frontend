import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrigadaDataService } from '../../services/brigada-data.service'; // Similar a BrigadistaDataService
import { Brigada } from './../../models/brigada';
import { BrigadaService } from '../../services/brigadaService';

@Component({
  selector: 'app-actualizar-brigada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-brigada.component.html',
  styleUrls: ['./actualizar-brigada.component.css']
})
export class ActualizarBrigadaComponent implements OnInit {
  brigada: Brigada = {} as Brigada;
  cantidadPersonal: number = 0;
  personal: any[] = [];  // Lista de personal
  roles: string[] = [    
    'Coordinador Senior',
    'Coordinador Junior',
    'Ingeniero forestal',
    'Biólogo o profesional botánico',
    'Coordinador logistico',
    'Responsable frente de trabajo',
    'Auxiliar forestal',
    'Dendrólogo'];  // Lista de roles predeterminados

  constructor(
    private brigadaService: BrigadaDataService,
    private apiService: BrigadaService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.brigadaService.currentBrigada.subscribe(data => { // CAMBIADO brigada$ → currentBrigada
      if (data) {
        this.brigada = data;
      } else {
        const local = localStorage.getItem('brigadaSeleccionada');
        if (local) {
          this.brigada = JSON.parse(local);
          this.brigada.Fecha_Inicio = this.formatearFecha(this.brigada.Fecha_Inicio);
  
          this.brigadaService.cambiarBrigada(this.brigada); // CAMBIADO setBrigada → cambiarBrigada
        } else {
          alert('No se ha seleccionado ninguna brigada.');
          this.router.navigate(['/admin/brigadas']);
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

  ajustarCantidadPersonal(): void {
    this.personal = Array.from({ length: this.cantidadPersonal }, () => ({ nombre: '', rol: '' }));
  }
  

  cancelar(): void {
    // Lógica para cancelar la operación, por ejemplo redirigir a la página de brigadas
    this.router.navigate(['/admin/brigadas']);
  }

  guardar(): void {
    // Lógica para guardar la brigada, similar a guardar cambios
    this.guardarCambios();
  }

  
  guardarCambios() {
    if (this.brigada && this.brigada.id) {
      const brigadaActualizada = { ...this.brigada };

      // Convertir fecha a ISO si está presente
      if (brigadaActualizada.Fecha_Inicio) {
        brigadaActualizada.Fecha_Inicio = new Date(brigadaActualizada.Fecha_Inicio).toISOString();
      }

      this.apiService.actualizarBrigada(brigadaActualizada.id, brigadaActualizada).subscribe({
        next: (respuesta) => {
          console.log('Brigada actualizada correctamente:', respuesta);
          alert('Brigada actualizada exitosamente.');
          this.router.navigate(['/admin/brigadas']);
        },
        error: (error) => {
          console.error('Error al actualizar la brigada:', error);
          alert('Ocurrió un error al guardar los cambios.');
        }
      });
    } else {
      alert('Datos incompletos de la brigada.');
    }
  }
}
