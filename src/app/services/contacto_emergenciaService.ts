/*
 * Permite que la clase pueda injectarse en cualquier parte del proyecto.
 */
import { Injectable } from '@angular/core';
/*
 * Import para hacer importaciones HTTP (GET, POST, PUT, DELETE)
 */
import { HttpClient } from '@angular/common/http';
/*
 * Manejo de respuestas asincronicas para esperar respuestas de API,
 * Al hacer http. angular devuelve Observable que es una promesa.
 */
import { Observable } from 'rxjs';
/*
 * Con este decorador Injectable dice que se puede usar en cualquier parte del proyecto
 * sin tener que registrarlo en un modulo.
 */
@Injectable({
  providedIn: 'root'
})

export class ContactoEmergenciaService   {
  /*
   * Es la URL del backend con express
   */
  private apiUrl = 'https://proyecto-integrador-5-backend.onrender.com/api/contactEmer';
  /**
   * Inyeccion e instancia del cliente de HTTP para poder usarlo
   * @param http
   */
  constructor(private http: HttpClient) { }

  buscarContactoPorDocumento(doc: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/brigadista/${doc}`);
  }


  actualizarContacto(id: number, datosActualizados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datosActualizados);
  }
}
