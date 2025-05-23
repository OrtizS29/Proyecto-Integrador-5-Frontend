import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-layout',
  templateUrl: './usuario-layout.component.html',
  styleUrls: ['./usuario-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule]
})
export class UsuarioLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  probarBoton() {
  console.log('✅ ¡Haz hecho clic en el botón de "Perfil"!');
}

}
