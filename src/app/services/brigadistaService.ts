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

export class BrigadistaService {
  /*
   * Es la URL del backend con express
   */
  private apiUrl = 'http://localhost:3000/api/brigadistas';
  /**
   * Inyeccion e instancia del cliente de HTTP para poder usarlo
   * @param http
   */
  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  eliminarBrigadista(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarBrigadistaPorId(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarBrigadista(id: number, datosActualizados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datosActualizados);
  }
}
