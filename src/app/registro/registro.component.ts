import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../services/loginService';
import { deleteUser ,Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

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

  constructor(private auth: Auth, private router: Router, private loginService: Login) {}

  registrar() {
    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.correo, this.contrasena)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken();

      this.loginService.loginConToken(token).subscribe({
        next: () => {
          alert('Registro exitoso');
          this.router.navigate(['/']);
        },
        error: async (err) => {
          console.error('Error en backend:', err);

          // Si el backend dice que no está habilitado
          if (err.status === 403) {
            alert('Tu cuenta aún no está habilitada. Contacta al administrador.');

            try {
              await deleteUser(user); // Borramos la cuenta de Firebase
              console.log('Cuenta Firebase eliminada');
            } catch (e) {
              console.warn('No se pudo eliminar la cuenta Firebase:', e);
            }
          } else {
            alert('Error al registrar: ' + (err.error?.error || ''));
          }
        }
      });
    })
    .catch((error) => {
      console.error('Error al registrar en Firebase:', error);
      alert('Error al registrar: ' + error.message);
    });
  }

  registrarConGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then( async ( result ) => {

        const user = result.user;
        const token = await user.getIdToken();

        this.loginService.loginConToken(token).subscribe({
          next: () => {
            alert('Registro con Google exitoso');
            this.router.navigate(['/']);
          },
          error: async (err) => {
            console.error('Error en backend:', err);

            // Si el backend dice que no está habilitado
            if (err.status === 403) {
              alert('Tu cuenta aún no está habilitada. Contacta al administrador.');

              try {
                await deleteUser(user); // Borramos la cuenta de Firebase
                console.log('Cuenta Firebase eliminada');
                this.router.navigate(['/']);
              } catch (e) {
                console.warn('No se pudo eliminar la cuenta Firebase:', e);
              }
            } else {
              alert('Error con google: ' + (err.error?.error || ''));
            }
          }
        });
      })
      .catch(error => {
        console.error('Error con Google:', error);
        alert('Error con Google: ' + error.message);
      });
  }
}
