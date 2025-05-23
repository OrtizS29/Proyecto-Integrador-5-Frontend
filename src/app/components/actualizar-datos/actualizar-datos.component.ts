import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css']
})
export class ActualizarDatosComponent {
  constructor(private router: Router) {}

  irARegistro() {
    this.router.navigate(['/usuario/registrar-usuario']);
  }

  irAActualizar() {
    this.router.navigate(['/usuario/actualizar-usuario']);
  }
}
