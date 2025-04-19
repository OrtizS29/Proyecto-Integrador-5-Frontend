import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common'; // 👈 Importa NgIf desde @angular/common

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [RouterModule, NgIf], // 👈 Agrégalo aquí
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css']
})
export class AdminInicioComponent {
  isSidebarCollapsed = false;
  showPersonalSubmenu = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  togglePersonalSubmenu() {
    this.showPersonalSubmenu = !this.showPersonalSubmenu;
  }
}
