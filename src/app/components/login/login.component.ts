import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}