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
import { Titulos } from '../models/titulos';
/*
 * Con este decorador Injectable dice que se puede usar en cualquier parte del proyecto
 * sin tener que registrarlo en un modulo.
 */
@Injectable({
  providedIn: 'root'
})

export class TituloService  {
  /*
   * Es la URL del backend con express
   */
  private apiUrl = 'https://proyecto-integrador-5-backend.onrender.com/api/titulos';
  /**
   * Inyeccion e instancia del cliente de HTTP para poder usarlo
   * @param http
   */
  constructor(private http: HttpClient) { }

  buscarContactoPorDocumento(doc: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/brigadista/${doc}`);
  }

  actualizartitulo(id: number, datosActualizados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datosActualizados);
  }

  /*
   * Obtener todos los títulos
   */
  obtenerTodos(): Observable<Titulos[]> {
    return this.http.get<Titulos[]>(this.apiUrl);
  }

  /*
   * Crear un nuevo título
   */
  crearTitulo(nuevoTitulo: Titulos): Observable<Titulos> {
    return this.http.post<Titulos>(this.apiUrl, nuevoTitulo);
  }
}
