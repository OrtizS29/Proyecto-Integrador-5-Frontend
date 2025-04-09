import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 👈 importa tu login

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // 👈 agrégalo aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-app';
}
