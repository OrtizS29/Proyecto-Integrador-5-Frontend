import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrigadistaService } from './../../services/brigadistaService';
import { Brigadista } from './../../models/brigadista';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';  // Importa la librería xlsx

@Component({
  selector: 'app-gestion-personal',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  templateUrl: './gestion-personal.component.html',
  styleUrls: ['./gestion-personal.component.css']
})
export class GestionPersonalComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Numero_Documento',
    'Nombre',
    'Apellido',
    'Tipo_Documento',
    'Pais_Expedicion_Documento',
    'Municipio_Expedicion_Documento',
    'Fecha_Expedicion_Documento',
    'Pais_Nacimiento',
    'Fecha_Nacimiento',
    'Grupo_Sanguineo',
    'Rh',
    'Sexo',
    'Estado_Civil',
    'Telefono_Movil',
    'Correo_Electronico',
    'Talla_Zapato',
    'Peso',
    'Altura',
    'Ciudad_Recidencia',
    'Direccion',
    'Profesion',
    'Disponibilidad',
    'Estado',
    'Id_Brigada'
  ];

  dataSource = new MatTableDataSource<Brigadista>();
  filaSeleccionada: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private brigadistaService: BrigadistaService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarBrigadistas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarBrigadistas(): void {
    this.brigadistaService.obtenerTodos().subscribe({
      next: (brigadistas: Brigadista[]) => {
        brigadistas.forEach(brigadista => {
          brigadista.Fecha_Nacimiento = this.datePipe.transform(brigadista.Fecha_Nacimiento, 'dd/MM/yyyy') ?? '';
          brigadista.Fecha_Expedicion_Documento = this.datePipe.transform(brigadista.Fecha_Expedicion_Documento, 'dd/MM/yyyy') ?? '';
        });
        this.dataSource.data = brigadistas;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.error("Error al cargar los brigadistas", error)
    });
  }

  eliminar(brigadista: Brigadista): void {
    if (confirm(`¿Estás seguro de eliminar al brigadista ${brigadista.Nombre} ${brigadista.Apellido}?`)) {
      this.brigadistaService.eliminarBrigadista(brigadista.Numero_Documento).subscribe({
        next: () => {
          this.filaSeleccionada = null;
          this.cargarBrigadistas(); // Recarga los brigadistas luego de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar brigadista:', error);
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.readExcel(file);
  }
  //lee el excel
  readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<Brigadista>(sheet);

      // Convierte las fechas del Excel al formato necesario
      jsonData.forEach((brigadista: Brigadista) => {
        brigadista.Fecha_Nacimiento = this.datePipe.transform(brigadista.Fecha_Nacimiento, 'yyyy-MM-dd')!;
        brigadista.Fecha_Expedicion_Documento = this.datePipe.transform(brigadista.Fecha_Expedicion_Documento, 'yyyy-MM-dd')!;
      });

      this.dataSource = new MatTableDataSource<Brigadista>(jsonData);
      this.dataSource.paginator = this.paginator;
    };
    reader.readAsBinaryString(file);
  }

  seleccionarFila(fila: Brigadista): void {
    this.filaSeleccionada = fila;
    console.log("Fila seleccionada:", fila);
  }

  irAActualizarSeleccionado(): void {
    if (this.filaSeleccionada) {
      console.log('Fila seleccionada:', this.filaSeleccionada); //

      localStorage.setItem('brigadistaSeleccionado', JSON.stringify(this.filaSeleccionada));

      const brigadistaGuardado = localStorage.getItem('brigadistaSeleccionado');
      console.log('Guardado en localStorage:', brigadistaGuardado); // <-- verifica si se guardó bien

      this.router.navigate(['/admin/personal/actualizar']);
    } else {
      console.warn('No hay fila seleccionada');
    }
  }
}
