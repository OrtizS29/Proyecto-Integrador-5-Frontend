import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import * as XLSX from 'xlsx';  // Importa la librería xlsx

@Component({
  selector: 'app-gestion-personal',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './gestion-personal.component.html',
  styleUrls: ['./gestion-personal.component.css']
})
export class GestionPersonalComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'numeroDocumento',
    'nombre',
    'apellido',
    'tipoDocumento',
    'paisExpedicionDocumento',
    'municipioExpedicionDocumento',
    'fechaExpedicionDocumento',
    'paisNacimiento',
    'fechaNacimiento',
    'grupoSanguineo',
    'rh',
    'sexo',
    'estadoCivil',
    'telefonoMovil',
    'correoElectronico',
    'tallaZapato',
    'peso',
    'altura',
    'ciudadResidencia',
    'direccion',
    'profesion',
    'disponibilidad',
    'estado',
    'idBrigada'
  ];

  dataSource = new MatTableDataSource<Brigadista>(BRIGADISTAS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

export interface Brigadista {
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  paisExpedicionDocumento: string;
  municipioExpedicionDocumento: string;
  fechaExpedicionDocumento: string;
  paisNacimiento: string;
  fechaNacimiento: string;
  grupoSanguineo: string;
  rh: string;
  sexo: string;
  estadoCivil: string;
  telefonoMovil: string;
  correoElectronico: string;
  tallaZapato: string;
  peso: string;
  altura: string;
  ciudadResidencia: string;
  direccion: string;
  profesion: string;
  disponibilidad: string;
  estado: string;
  idBrigada: string;
}

const BRIGADISTAS_DATA: Brigadista[] = [
  {
    numeroDocumento: '1233',
    nombre: 'Juan',
    apellido: 'Perez',
    tipoDocumento: 'cc',
    paisExpedicionDocumento: 'Colombia',
    municipioExpedicionDocumento: 'Bogotá',
    fechaExpedicionDocumento: '12-11-2003',
    paisNacimiento: 'Colombia',
    fechaNacimiento: '12-11-2003',
    grupoSanguineo: 'A',
    rh: '+',
    sexo: 'Masculino',
    estadoCivil: 'Soltero',
    telefonoMovil: '3121234567',
    correoElectronico: 'juan.perez@email.com',
    tallaZapato: '42',
    peso: '75',
    altura: '1.75',
    ciudadResidencia: 'Bogotá',
    direccion: 'Carrera 15 # 22-30',
    profesion: 'Ingeniero',
    disponibilidad: 'Disponible',
    estado: 'Activo',
    idBrigada: '1'
  },
  {
    numeroDocumento: '1233',
    nombre: 'Juan',
    apellido: 'Perez',
    tipoDocumento: 'cc',
    paisExpedicionDocumento: 'Colombia',
    municipioExpedicionDocumento: 'Bogotá',
    fechaExpedicionDocumento: '12-11-2003',
    paisNacimiento: 'Colombia',
    fechaNacimiento: '12-11-2003',
    grupoSanguineo: 'A',
    rh: '+',
    sexo: 'Masculino',
    estadoCivil: 'Soltero',
    telefonoMovil: '3121234567',
    correoElectronico: 'juan.perez@email.com',
    tallaZapato: '42',
    peso: '75',
    altura: '1.75',
    ciudadResidencia: 'Bogotá',
    direccion: 'Carrera 15 # 22-30',
    profesion: 'Ingeniero',
    disponibilidad: 'Disponible',
    estado: 'Activo',
    idBrigada: '1'
  }

];
