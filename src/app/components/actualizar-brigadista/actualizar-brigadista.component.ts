// actualizar-brigadista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrigadistaDataService } from '../../services/brigadista-data.service';
import { Brigadista } from './../../models/brigadista';
import { Router } from '@angular/router';


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
    public router: Router
  ) {}

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
    // Aquí iría la llamada PUT/servicio para persistir cambios.
    console.log('Brigadista actualizado:', this.brigadista);
    // luego navegas de vuelta:
    this.router.navigate(['/admin/personal']);
  }
}
