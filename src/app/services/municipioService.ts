import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private apiUrl = 'https://proyecto-integrador-5-backend.onrender.com/api/municipio';

  constructor(private http: HttpClient) {}

    obtenerMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.apiUrl);
    }
}
