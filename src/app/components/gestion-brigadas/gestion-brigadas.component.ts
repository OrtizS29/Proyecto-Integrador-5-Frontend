import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Brigada } from '../../models/brigada';
import { BrigadaService } from '../../services/brigadaService';
import { DatePipe } from '@angular/common';

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
  providers: [DatePipe],
  templateUrl: './gestion-brigadas.component.html',
  styleUrls: ['./gestion-brigadas.component.css']
})

export class GestionBrigadasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'Nombre', 'Municipio', 'Fecha_Inicio'];
  dataSource = new MatTableDataSource<Brigada>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private brigadaService: BrigadaService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cargarBrigadas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarBrigadas(): void{
    this.brigadaService.obtenerTodos().subscribe({
      next:(brigadas: Brigada[]) => {
        brigadas.forEach(brigada => {
        brigada.Fecha_Inicio = this.datePipe.transform(brigada.Fecha_Inicio, 'dd/MM/yyyy')!;
        });
        this.dataSource.data = brigadas;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error("Error al cargar las brigadas", error)
      }
    })
  }


  eliminar(brigada: Brigada): void{
    if (confirm(`¿Estás seguro de eliminar la brigada ${brigada.Nombre} ?`)){
      this.brigadaService.eliminarBrigada(brigada.id).subscribe({
        next: () => {
          this.filaSeleccionada = null;
          this.cargarBrigadas(); // Recarga las brigadas luego de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar brigadista:', error);
        }
      })
    }
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


