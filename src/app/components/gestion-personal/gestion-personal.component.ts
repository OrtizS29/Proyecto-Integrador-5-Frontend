import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-gestion-personal',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
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
    nombre: 'asdas',
    apellido: 'dasdas',
    tipoDocumento: 'cc',
    paisExpedicionDocumento: 'adsda',
    municipioExpedicionDocumento: 'das',
    fechaExpedicionDocumento: '12-11-2003',
    paisNacimiento: 'asdas',
    fechaNacimiento: '12-11-2003',
    grupoSanguineo: 'dasd',
    rh: '+',
    sexo: 'sad',
    estadoCivil: 'dsa',
    telefonoMovil: '132',
    correoElectronico: 'das@asd',
    tallaZapato: '123',
    peso: '213',
    altura: '21',
    ciudadResidencia: 'das',
    direccion: 'ads',
    profesion: 'ads',
    disponibilidad: 'asd',
    estado: 'das',
    idBrigada: '1'
  }
];

