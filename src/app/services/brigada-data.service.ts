import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brigada } from '../models/brigada'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class BrigadaDataService {
  private brigadaSource = new BehaviorSubject<Brigada | null>(null);
  currentBrigada = this.brigadaSource.asObservable();

  constructor() {}

  cambiarBrigada(brigada: Brigada) {
    this.brigadaSource.next(brigada);
  }

  limpiarBrigada() {
    this.brigadaSource.next(null);
  }
}
