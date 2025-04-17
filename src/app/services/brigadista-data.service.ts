import { Brigadista } from './../models/brigadista';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrigadistaDataService {
  private brigadistaSeleccionado = new BehaviorSubject<Brigadista | null>(null);
  brigadista$ = this.brigadistaSeleccionado.asObservable();

  setBrigadista(brigadista: Brigadista) {
    this.brigadistaSeleccionado.next(brigadista);
  }
}
