import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrigadistaDataService } from '../../services/brigadista-data.service';
import { Brigadista } from './../../models/brigadista';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actualizar-brigadista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualizar-brigadista.component.html',
  styleUrls: ['./actualizar-brigadista.component.css']
})
export class ActualizarBrigadistaComponent implements OnInit {
  brigadista: Brigadista | null = null;

  constructor(private brigadistaService: BrigadistaDataService,   private router: Router // ✅ ¡Agregado!
  ) { }

  ngOnInit(): void {
    this.brigadistaService.brigadista$.subscribe(data => {
      if (data) {
        this.brigadista = data;
      } else {
        const local = localStorage.getItem('brigadistaTemporal');
        if (local) {
          const brigadista: Brigadista = JSON.parse(local);
          this.brigadista = brigadista;
          this.brigadistaService.setBrigadista(brigadista);
        } else {
          alert('No se ha seleccionado ningún brigadista.');
          this.router.navigate(['/admin/personal']);
        }
      }
    });
  }


}
