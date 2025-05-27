
// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Login {
  constructor(private http: HttpClient) {}

  loginConToken(token: string) {
    return this.http.post('https://proyecto-integrador-5-backend.onrender.com/api/auth/login', { token });
  }
}
