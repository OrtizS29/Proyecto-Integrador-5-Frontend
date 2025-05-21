import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private auth: Auth, private router: Router) {}

  registrar() {
    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.correo, this.contrasena)
      .then(() => {
        alert('Registro exitoso');
        this.router.navigate(['/']); // Redirige al login
      })
      .catch(error => {
        console.error('Error al registrar:', error);
        alert('Error: ' + error.message);
      });
  }

  registrarConGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(() => {
        alert('Registro con Google exitoso');
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error con Google:', error);
        alert('Error con Google: ' + error.message);
      });
  }
}
