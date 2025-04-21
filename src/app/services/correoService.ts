import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  private apiUrl = 'http://localhost:3000/api/correo';

  constructor(private http: HttpClient) {}

  /**
   * Envía correos a todos los contactos de la brigada por su ID
   * @param brigadaId El ID de la brigada
   */
  enviarCorreo(brigadaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${brigadaId}`);
  }
}
