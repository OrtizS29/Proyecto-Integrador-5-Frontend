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

import * as XLSX from 'xlsx';  // Importa la librería xlsx

@Component({
  selector: 'app-gestion-personal',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private brigadistaService: BrigadistaService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cargarBrigadistas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarBrigadistas(): void{
    this.brigadistaService.obtenerTodos().subscribe({
      next: (brigadistas: Brigadista[]) => {
        brigadistas.forEach(brigadista => {
          brigadista.fechaNacimiento = this.datePipe.transform(brigadista.fechaNacimiento, 'dd/MM/yyyy')!;
          brigadista.fechaExpedicionDocumento = this.datePipe.transform(brigadista.fechaExpedicionDocumento, 'dd/MM/yyyy')!;
        });
        this.dataSource.data = brigadistas;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error("Error al cargar los brigadistas", error)
      }
    })
  }

  eliminar(brigadista: Brigadista): void {
    if (confirm(`¿Estás seguro de eliminar al brigadista ${brigadista.nombre} ${brigadista.apellido}?`)) {
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
    if (file) {
      this.readExcel(file);
    }
  }

  readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Brigadista>(worksheet);

      // Actualizar el dataSource
      this.dataSource = new MatTableDataSource<Brigadista>(jsonData);

      // 🔥 Reasignar el paginador
      this.dataSource.paginator = this.paginator;
    };
    reader.readAsBinaryString(file);
  }


  filaSeleccionada: any = null;

  seleccionarFila(fila: any): void {
    this.filaSeleccionada = fila;
    console.log("Fila seleccionada:", fila);
  }


}

// const BRIGADISTAS_DATA: Brigadista[] = [
//   {
//     numeroDocumento: '1233',
//     nombre: 'Juan',
//     apellido: 'Perez',
//     tipoDocumento: 'cc',
//     paisExpedicionDocumento: 'Colombia',
//     municipioExpedicionDocumento: 'Bogotá',
//     fechaExpedicionDocumento: '12-11-2003',
//     paisNacimiento: 'Colombia',
//     fechaNacimiento: '12-11-2003',
//     grupoSanguineo: 'A',
//     rh: '+',
//     sexo: 'Masculino',
//     estadoCivil: 'Soltero',
//     telefonoMovil: '3121234567',
//     correoElectronico: 'juan.perez@email.com',
//     tallaZapato: '42',
//     peso: '75',
//     altura: '1.75',
//     ciudadResidencia: 'Bogotá',
//     direccion: 'Carrera 15 # 22-30',
//     profesion: 'Ingeniero',
//     disponibilidad: 'Disponible',
//     estado: 'Activo',
//     idBrigada: '1'
//   },
//   {
//     numeroDocumento: '1233',
//     nombre: 'Juan',
//     apellido: 'Perez',
//     tipoDocumento: 'cc',
//     paisExpedicionDocumento: 'Colombia',
//     municipioExpedicionDocumento: 'Bogotá',
//     fechaExpedicionDocumento: '12-11-2003',
//     paisNacimiento: 'Colombia',
//     fechaNacimiento: '12-11-2003',
//     grupoSanguineo: 'A',
//     rh: '+',
//     sexo: 'Masculino',
//     estadoCivil: 'Soltero',
//     telefonoMovil: '3121234567',
//     correoElectronico: 'juan.perez@email.com',
//     tallaZapato: '42',
//     peso: '75',
//     altura: '1.75',
//     ciudadResidencia: 'Bogotá',
//     direccion: 'Carrera 15 # 22-30',
//     profesion: 'Ingeniero',
//     disponibilidad: 'Disponible',
//     estado: 'Activo',
//     idBrigada: '1'
//   }

// ];
