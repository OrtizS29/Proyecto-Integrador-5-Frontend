import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedad } from '../models/novedades';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  private apiUrl = 'https://proyecto-integrador-5-backend.onrender.com/api/novedades';

  constructor(private http: HttpClient) {}

  obtenerNovedades(): Observable<Novedad[]> {
    return this.http.get<Novedad[]>(this.apiUrl);
  }

  crearNovedad(novedad: any): Observable<Novedad> {
    return this.http.post<Novedad>(this.apiUrl, novedad);
  }

  eliminarNovedad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
