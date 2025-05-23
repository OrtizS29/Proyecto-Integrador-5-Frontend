import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css']
})
export class AdminInicioComponent {
  isSidebarCollapsed = false;
  showPersonalSubmenu = false;
  showLogoutMenu = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  togglePersonalSubmenu() {
    this.showPersonalSubmenu = !this.showPersonalSubmenu;
  }

  toggleLogoutMenu() {
    this.showLogoutMenu = !this.showLogoutMenu;
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error cerrando sesión:', error);
    });
  }
}
