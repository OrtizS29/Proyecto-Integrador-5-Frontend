import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrigadaService } from '../../services/brigadaService';
import { Brigada } from '../../models/brigada';
import { CalendarioBrigada } from '../../models/calendario-brigada';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  weeks: { date: Date | null }[][] = [];

  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  brigadasCalendario: CalendarioBrigada[] = [];

  constructor(private brigadaService: BrigadaService) {}

  ngOnInit(): void {
    this.generateWeeks(this.currentYear, this.currentMonth);
    this.cargarBrigadas();
  }

  cargarBrigadas(): void {
    this.brigadaService.obtenerTodos().subscribe((brigadas: Brigada[]) => {
      this.brigadasCalendario = brigadas
        .map(b => ({
          id: b.id,
          Nombre: b.Nombre,
          Fecha_Inicio: new Date(b.Fecha_Inicio)
        }))
        .filter(b => !isNaN(b.Fecha_Inicio.getTime()));
    });
  }

  generateWeeks(year: number, month: number): void {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay(); // Domingo = 0
    const daysInMonth = lastDay.getDate();
    let dayCounter = 1;

    const semanas: { date: Date | null }[][] = [];

    for (let i = 0; i < 6; i++) {
      const semana: { date: Date | null }[] = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          semana.push({ date: null });
        } else {
          semana.push({ date: new Date(year, month, dayCounter) });
          dayCounter++;
        }
      }

      semanas.push(semana);
    }

    this.weeks = semanas;
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateWeeks(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateWeeks(this.currentYear, this.currentMonth);
  }

  isDateValid(date: Date | null): boolean {
    return date !== null && !isNaN(date.getTime());
  }

  isToday(date: Date | null): boolean {
    if (!this.isDateValid(date)) return false;
  
    const today = new Date();
    const validDate = date as Date; // Asegura al compilador que no es null
  
    return (
      validDate.getDate() === today.getDate() &&
      validDate.getMonth() === today.getMonth() &&
      validDate.getFullYear() === today.getFullYear()
    );
  }
  
}
