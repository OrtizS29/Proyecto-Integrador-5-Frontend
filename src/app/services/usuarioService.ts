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
/*
 * Clase del servicio de usuario donde se hacen peticiones HTTP al backend
 */
export class UsuarioService {
  /*
   * Es la URL del backend con express
   */
  private apiUrl = 'http://localhost:3000/api/usuarios';
  /**
   * Inyeccion e instancia del cliente de HTTP para poder usarlo
   * @param http
   */
  constructor(private http: HttpClient) {}
  /**
   * Funcion que hace un post a la URL del backend para crear un usuario,
   * le manda un objeto JSON con email y pasword y devuelva un Observable con
   * la respuesta del backend.
   * @param email
   * @param password
   * @returns
   */
  registrarUsuario(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }
  /**
   * Funcion que hace un DELETE a la URL del backend para eliminar un usuario,
   *  y devuelva un Observable con la respuesta del backend.
   * @param uid
   * @returns
   */
  eliminarUsuario(uid: string): Observable<any> {
    /**
     * ejemplo de lo que se quiere hacer: 'apiUrl/uid'
     */
    return this.http.delete(`${this.apiUrl}/${uid}`);
  }
  /**
   * Funcion que hace un PUT y le manda datos nuevos para actualizar el usuario.
   * @param uid
   * @param datos
   * @returns
   */
  actualizarUsuario(uid: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${uid}`, datos);
  }
  /**
   * Funcion que hace un GET a la URL en temple STRING y devuelve los datos
   * si existe el usuario.
   * @param email
   * @returns
   */
  buscarUsuario(email: string): Observable<any> {
    const emailCodificado = encodeURIComponent(email);
    return this.http.get(`${this.apiUrl}/${emailCodificado}`);
  }
  /**
   *
   * @returns
   */
  listarUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
