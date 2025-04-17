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
        const local = localStorage.getItem('brigadistaTemporal');
        if (local) {
          this.brigadista = JSON.parse(local);
          this.brigadistaService.setBrigadista(this.brigadista);
        } else {
          alert('No se ha seleccionado ningún brigadista.');
          this.router.navigate(['/admin/personal']);
        }
      }
    });
  }

  guardarCambios() {
    // Aquí iría la llamada PUT/servicio para persistir cambios.
    console.log('Brigadista actualizado:', this.brigadista);
    // luego navegas de vuelta:
    this.router.navigate(['/admin/personal']);
  }
}
