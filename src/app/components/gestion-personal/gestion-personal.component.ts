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
import { HttpClient } from '@angular/common/http';
import { BrigadistaDataService } from './../../services/brigadista-data.service';
import { CorreoService } from '../../services/correoService';
import Swal from 'sweetalert2';

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
    private brigadistaDataService: BrigadistaDataService,
    private CorreoService: CorreoService,
    private datePipe: DatePipe,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    localStorage.clear();
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
  Swal.fire({
    title: `¿Eliminar a ${brigadista.Nombre} ${brigadista.Apellido}?`,
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.brigadistaService.eliminarBrigadista(brigadista.Numero_Documento).subscribe({
        next: () => {
          this.filaSeleccionada = null;
          this.cargarBrigadistas();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El brigadista ha sido eliminado correctamente',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: (error) => {
          console.error('Error al eliminar brigadista:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el brigadista'
          });
        }
      });
    }
  });
}


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.enviarArchivoAlBackend(file);
  }

enviarArchivoAlBackend(file: File): void {
  const formData = new FormData();
  formData.append('file', file);

  this.http.post<{ message: string; correos: string[] }>('https://proyecto-integrador-5-backend.onrender.com/api/importar', formData,).subscribe({
    next: (res) => {
      Swal.fire({
        icon: 'success',
        title: 'Importado',
        text: 'Archivo importado correctamente',
        timer: 2000,
        showConfirmButton: false
      });

      this.cargarBrigadistas();

      console.log("se cargaron los brigadistas")
      console.log("Respuesta completa:", res);
      const correos = res.correos;
      console.log("correos:" + correos)
      if (correos && correos.length > 0) {
        console.log("estoy antes de enviar correo")
        this.CorreoService.enviarCorreoIngreso(correos)
          .then(() => {
            console.log('📧 Correos de ingreso enviados correctamente');
          })
          .catch((error:any) => {
            console.error('❌ Error al enviar correos:', error);
          });
      }
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al importar el archivo'
      });
    }
  });
}



  seleccionarFila(fila: Brigadista): void {
    this.filaSeleccionada = fila;
    console.log("Fila seleccionada:", fila);
  }

  irAActualizarSeleccionado(): void {
    if (this.filaSeleccionada) {
      this.brigadistaDataService.setBrigadista(this.filaSeleccionada);
      localStorage.removeItem('brigadistaSeleccionado');
      localStorage.setItem('brigadistaSeleccionado', JSON.stringify(this.filaSeleccionada));
      this.router.navigate(['/admin/personal/actualizar']);
    } else {
      console.warn('No hay fila seleccionada');
    }
  }


}
