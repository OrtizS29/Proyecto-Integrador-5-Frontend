import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrigadaService } from '../../services/brigadaService';
import { PostulacionService } from '../../services/postulacionService';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-postularse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postularse.component.html',
  styleUrls: ['./postularse.component.css']
})
export class PostularseComponent {
  brigadas: any[] = [];

  cargos: string[] = [
    'Coordinador Senior',
    'Coordinador Junior',
    'Ingeniero forestal',
    'Biólogo o profesional botánico',
    'Coordinador logístico',
    'Responsable frente de trabajo',
    'Auxiliar forestal',
    'Dendrólogo'
  ];

  brigadaSeleccionada = '';
  cargoSeleccionado = '';

  constructor(private brigadaService: BrigadaService, private postulacionService: PostulacionService) {}

  ngOnInit(): void {
    this.brigadaService.obtenerTodos().subscribe({
      next: (data) => {
        this.brigadas = data;
      },
      error: (error) => {
        console.error('Error al obtener brigadas', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las brigadas desde el servidor.'
        });
      }
    });
  }

guardarPostulacion() {
  if (this.brigadaSeleccionada && this.cargoSeleccionado) {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado")!);
    const numDocumento = usuario?.Brigadista?.Numero_Documento;

    console.log("usuario",usuario);
    console.log("usuario id", numDocumento);

    const nuevaPostulacion = {
      cargo: this.cargoSeleccionado,
      ID_Brigada: Number(this.brigadaSeleccionada),
      ID_Brigadista: numDocumento
    };

    this.postulacionService.crearPostulacion(nuevaPostulacion).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Postulación exitosa',
          html: `✅ Te has postulado a la brigada <strong>${this.brigadas.find(b => b.id === Number(this.brigadaSeleccionada)).Nombre}</strong> como <strong>${this.cargoSeleccionado}</strong>.`,
          confirmButtonText: 'Cerrar',
        });
        // Puedes resetear el formulario si deseas
        this.brigadaSeleccionada = '';
        this.cargoSeleccionado = '';
      },
      error: (error:any) => {
        console.error('Error al guardar postulación', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la postulación.'
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Por favor seleccione una brigada y un cargo.'
    });
  }
}
}
