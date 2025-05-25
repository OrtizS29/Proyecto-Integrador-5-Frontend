import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conglomerado } from '../models/conglomerado';

@Injectable({
  providedIn: 'root'
})
export class ConglomeradoService {
  private apiUrl = 'https://proyecto-integrador-5-backend.onrender.com/api/conglomerado';

  constructor(private http: HttpClient) {}

  obtenerConglomerados(): Observable<Conglomerado[]> {
    return this.http.get<Conglomerado[]>(this.apiUrl);
  }
}
