import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { getIdToken } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  /**
   * Inyeccion del servicio de autenticación de Firebase
   * @param router
   * @param auth
   */
  constructor(
    private router: Router,
    private auth: Auth //
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (UserCredential) => {
        const user = UserCredential.user;
        const token = await getIdToken(user);
  
        console.log('Login exitoso');
        alert('Se inició sesión');
  
        this.router.navigate(['/admin']); // ← Redirección
      })
      .catch((error) => {
        console.error("Error al iniciar sesión", error);
        alert('Correo o contraseña incorrecta');
      });
  }  
}
