import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-brigadas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterModule  // 👈 Agregado aquí
  ],
  templateUrl: './gestion-brigadas.component.html',
  styleUrls: ['./gestion-brigadas.component.css']
})

export class GestionBrigadasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombreBrigada', 'municipio', 'fechaInicio', 'personal'];
  dataSource = new MatTableDataSource<Brigada>(BRIGADAS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filaSeleccionada: any = null;

  seleccionarFila(fila: any): void {
    this.filaSeleccionada = fila;
    console.log("Fila seleccionada:", fila);
  }

  crearBrigada(): void {
    console.log("Crear nueva brigada");
    // Aquí puedes abrir un diálogo, redirigir a un formulario o mostrar un modal, etc.
  }
}

export interface Brigada {
  nombreBrigada: string;
  municipio: string;
  fechaInicio: string;
  personal: string[];
}

const BRIGADAS_DATA: Brigada[] = [
  {
    nombreBrigada: 'Brigada Norte',
    municipio: 'Cúcuta',
    fechaInicio: '2024-05-01',
    personal: ['Ana Ruiz', 'Carlos Torres', 'Laura Méndez']
  },
  {
    nombreBrigada: 'Brigada Sur',
    municipio: 'Neiva',
    fechaInicio: '2024-04-15',
    personal: ['Andrés Muñoz', 'Claudia Ríos']
  }
];
