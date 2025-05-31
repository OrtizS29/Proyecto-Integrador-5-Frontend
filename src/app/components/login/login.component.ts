import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { getIdToken } from 'firebase/auth';
import { Login } from '../../services/loginService';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

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
  mostrarBannerCookies = false;
  /**
   * Inyeccion del servicio de autenticación de Firebase
   * @param router
   * @param auth
   */
  constructor(
    private router: Router,
    private auth: Auth,
    private loginService: Login
  ) { }

  ngOnInit() {
    const consentimiento = localStorage.getItem('cookiesAceptadas');
    this.mostrarBannerCookies = consentimiento !== 'true' && consentimiento !== 'false';
  }

  aceptarCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    this.mostrarBannerCookies = false;
  }

  rechazarCookies() {
    localStorage.setItem('cookiesAceptadas', 'false');
    this.mostrarBannerCookies = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }



onLogin() {
  signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then(async (UserCredential) => {
      const user = UserCredential.user;
      const token = await getIdToken(user);

      this.loginService.loginConToken(token).subscribe({
        next: (res) => {
          const user = res.user;
          const rol = user.Roll;

          console.log("Rol de usuario", rol);

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Se inició sesión correctamente',
            timer: 2000,
            showConfirmButton: false
          });

          if (rol === "admin") {
            this.router.navigate(['/admin']);
          }else if (rol === "brigadista"){
            localStorage.setItem('usuarioLogueado', JSON.stringify(user));
            this.router.navigate(['/usuario']);
          }
        }
      })
    })
    .catch((error) => {
      console.error("Error al iniciar sesión", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo o contraseña incorrecta'
      });
    });
}


    iniciarConGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then( async ( result ) => {

        const user = result.user;
        const token = await user.getIdToken();

        this.loginService.loginConToken(token).subscribe({
          next: (res) => {
            const user = res.user;
            const rol = user.Roll;

            console.log("Rol de usuario", rol);

            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: 'Se inició sesión correctamente',
              timer: 2000,
              showConfirmButton: false
            });

            if (rol === "admin") {
              this.router.navigate(['/admin']);
            }else if (rol === "brigadista"){
              localStorage.setItem('usuarioLogueado', JSON.stringify(user));
              console.log(user);
              this.router.navigate(['/usuario']);
            }
          }
        })
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }
}
