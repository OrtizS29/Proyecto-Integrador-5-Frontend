import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ← Importación necesaria para routerLink y router-outlet

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [RouterModule], // ← Este va aquí y solo una vez
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css'] // ← Debe ser 'styleUrls' y array
})
export class AdminInicioComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
