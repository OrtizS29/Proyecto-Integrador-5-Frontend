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
import Swal from 'sweetalert2';
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
  displayedColumns: string[] = ['id', 'Nombre', 'Municipio', 'Conglomerado', 'Fecha_Inicio', 'acciones'];
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
        console.log("Brigadas recibidas:", brigadas);

        // Formatea fechas
        brigadas.forEach(brigada => {
          brigada.Fecha_Inicio = this.datePipe.transform(brigada.Fecha_Inicio, 'dd/MM/yyyy')!;
        });

        // Asigna a la tabla principal
        this.dataSource.data = brigadas;
        this.dataSource.paginator = this.paginator;

        // Llenar tabla calculadora con Nombre y Presupuesto
        this.sueldosCalculadora = brigadas.map(b => {
          const sueldo = Number(b.Presupuesto);
          return {
            brigada: b.Nombre,
            sueldo,
            viaticos: sueldo * 0.30,
            alimentacion: sueldo * 0.20,
            herramientas: sueldo * 0.50
          };
        });
      },
      error: (error) => {
        console.error("Error al cargar las brigadas", error);
      }
    });
  }


eliminar(brigada: Brigada): void {
  Swal.fire({
    title: `¿Estás seguro de eliminar la brigada "${brigada.Nombre}"?`,
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.brigadaService.eliminarBrigada(brigada.id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: `La brigada "${brigada.Nombre}" fue eliminada correctamente.`,
            confirmButtonText: 'Aceptar'
          });
          this.filaSeleccionada = null;
          this.cargarBrigadas();
        },
        error: (error) => {
          console.error('Error al eliminar brigada:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la brigada. Intenta nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  });
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
  // Datos simulados
  sueldosCalculadora: any[] = [];



  // Resultados calculados
  sumaTotal: number | null = null;
  promedio: number | null = null;
  totalViaticos: number | null = null;
  totalAlimentacion: number | null = null;
  totalHerramientas: number | null = null;

  promedioViaticos: number | null = null;
  promedioAlimentacion: number | null = null;
  promedioHerramientas: number | null = null;


  // Funciones
  calcularSumaTotal(): void {
    this.sumaTotal = this.sueldosCalculadora.reduce((acc, item) => acc + item.sueldo, 0);
    this.totalViaticos = this.sueldosCalculadora.reduce((acc, item) => acc + item.viaticos, 0);
    this.totalAlimentacion = this.sueldosCalculadora.reduce((acc, item) => acc + item.alimentacion, 0);
    this.totalHerramientas = this.sueldosCalculadora.reduce((acc, item) => acc + item.herramientas, 0);

    // Limpiamos los promedios
    this.promedio = null;
    this.promedioViaticos = null;
    this.promedioAlimentacion = null;
    this.promedioHerramientas = null;
  }


  calcularPromedio(): void {
    const total = this.sueldosCalculadora.reduce((acc, item) => acc + item.sueldo, 0);
    this.promedio = total / this.sueldosCalculadora.length;

    this.promedioViaticos = this.sueldosCalculadora.reduce((acc, item) => acc + item.viaticos, 0) / this.sueldosCalculadora.length;
    this.promedioAlimentacion = this.sueldosCalculadora.reduce((acc, item) => acc + item.alimentacion, 0) / this.sueldosCalculadora.length;
    this.promedioHerramientas = this.sueldosCalculadora.reduce((acc, item) => acc + item.herramientas, 0) / this.sueldosCalculadora.length;

    // Limpiamos las sumas
    this.sumaTotal = null;
    this.totalViaticos = null;
    this.totalAlimentacion = null;
    this.totalHerramientas = null;
  }


  ordenarAscendente(): void {
    this.sueldosCalculadora.sort((a, b) => a.sueldo - b.sueldo);
  }

  ordenarDescendente(): void {
    this.sueldosCalculadora.sort((a, b) => b.sueldo - a.sueldo);
  }

  verPostulaciones(): void{
    if(this.filaSeleccionada){
      const idBrigada= this.filaSeleccionada.id;
      this.router.navigate(["/admin/gestion-postulaciones", idBrigada]);
    }else {alert("Seleccione una brigada primero")}
  }
}
