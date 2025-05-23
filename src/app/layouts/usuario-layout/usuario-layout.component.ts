import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getAuth, signOut } from 'firebase/auth'; // 👈 Firebase logout

@Component({
  selector: 'app-usuario-layout',
  templateUrl: './usuario-layout.component.html',
  styleUrls: ['./usuario-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule]
})
export class UsuarioLayoutComponent {
  isSidebarCollapsed = false;
  menuVisible = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // ✅ Elimina token de localStorage
      localStorage.removeItem('token');

      // ✅ Redirige al login
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error cerrando sesión:', error);
    });
  }
}
