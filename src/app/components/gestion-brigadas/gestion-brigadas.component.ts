import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Brigada } from '../../models/brigada';
import { BrigadaService } from '../../services/brigadaService';
import { PersonalDialogComponent } from '../personal-dialog/personal-dialog.component';

@Component({
  selector: 'app-gestion-brigadas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [DatePipe],
  templateUrl: './gestion-brigadas.component.html',
  styleUrls: ['./gestion-brigadas.component.css']
})
export class GestionBrigadasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'Nombre', 'Municipio', 'Fecha_Inicio', 'acciones'];
  dataSource = new MatTableDataSource<Brigada>();
  filaSeleccionada: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private brigadaService: BrigadaService,
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog // 👈 Inyectado correctamente
  ) {}

  ngOnInit(): void {
    this.cargarBrigadas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarBrigadas(): void {
    this.brigadaService.obtenerTodos().subscribe({
      next: (brigadas: Brigada[]) => {
        brigadas.forEach(brigada => {
          brigada.Fecha_Inicio = this.datePipe.transform(brigada.Fecha_Inicio, 'dd/MM/yyyy')!;
        });
        this.dataSource.data = brigadas;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error("Error al cargar las brigadas", error);
      }
    });
  }

  eliminar(brigada: Brigada): void {
    if (confirm(`¿Estás seguro de eliminar la brigada ${brigada.Nombre} ?`)) {
      this.brigadaService.eliminarBrigada(brigada.id).subscribe({
        next: () => {
          this.filaSeleccionada = null;
          this.cargarBrigadas();
        },
        error: (error) => {
          console.error('Error al eliminar brigadista:', error);
        }
      });
    }
  }

  seleccionarFila(fila: any): void {
    this.filaSeleccionada = fila;
    console.log("Fila seleccionada:", fila);
  }

  irAActualizarSeleccionado(): void {
    if (this.filaSeleccionada) {
      localStorage.setItem('brigadaSeleccionada', JSON.stringify(this.filaSeleccionada));
      this.router.navigate(['/admin/actualizar-brigada']);
    } else {
      console.warn('No hay fila seleccionada');
    }
  }

  crearBrigada(): void {
    console.log("Crear nueva brigada");
  }

  irAVistaPersonal(id: number): void {
    const brigada = this.dataSource.data.find(b => b.id === id);
    if (!brigada) return;
  
    this.dialog.open(PersonalDialogComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: {
        id: brigada.id,
        nombre: brigada.Nombre,
        municipio: brigada.Municipio
      }
    });
  }
  
}
