import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component'; // 👈 importa tu login

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent], // 👈 agrégalo aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-app';
}
