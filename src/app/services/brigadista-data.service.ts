import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brigadista } from '../models/brigadista';

@Injectable({
  providedIn: 'root'
})
export class BrigadistaDataService {
  private brigadistaSubject = new BehaviorSubject<Brigadista | null>(null);
  brigadista$ = this.brigadistaSubject.asObservable();

  setBrigadista(brigadista: Brigadista): void {
    this.brigadistaSubject.next(brigadista);
  }
}
