
// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';


@Injectable({ providedIn: 'root' })
export class Login {
  constructor(private http: HttpClient) {}

  loginConToken(token: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://proyecto-integrador-5-backend.onrender.com/api/auth/login', { token });
  }
}
