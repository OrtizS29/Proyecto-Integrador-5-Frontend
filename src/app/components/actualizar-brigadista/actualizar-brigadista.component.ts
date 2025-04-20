// actualizar-brigadista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrigadistaDataService } from '../../services/brigadista-data.service';
import { Brigadista } from './../../models/brigadista';
import { Router } from '@angular/router';
import { BrigadistaService } from '../../services/brigadistaService';
import { Contacto_Emergencia } from './../../models/contacto-emergencia';
import { Titulos } from './../../models/titulos';
import { HttpClient } from '@angular/common/http'; // Asegúrate de tener esta importación
import { TituloService } from '../../services/tituloService';
import { ContactoEmergenciaService } from '../../services/contacto_emergenciaService';




@Component({
  selector: 'app-actualizar-brigadista',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './actualizar-brigadista.component.html',
  styleUrls: ['./actualizar-brigadista.component.css']
})


export class ActualizarBrigadistaComponent implements OnInit {
  // Inicializo como objeto vacío; luego viene la data del servicio o localStorage
  brigadista: Brigadista = {} as Brigadista;

  // ✅ Nuevas propiedades para contacto de emergencia y títulos
  contactoEmergencia: Contacto_Emergencia = {
    id: 0,
    Nombre_Completo: '',
    Parentesco: '',
    Telefono_Movil: '',
    Correo_Electronico: '',
    Doc_Brigadista: 0
  };

  titulo: Titulos = {
    id: 0,
    Titulo: '',
    Nivel_Escolaridad: '',
    Doc_Brigadista: 0
  };

  constructor(
    private brigadistaService: BrigadistaDataService,
    private apiService: BrigadistaService,
    private tituloService: TituloService,
    private contactoEmergenciaService: ContactoEmergenciaService, // <-- Agregado aquí
    private http: HttpClient, // ⬅️ Agregado esto
    public router: Router
  ) { }

  ngOnInit(): void {
    this.brigadistaService.brigadista$.subscribe(data => {
      console.log('🧪 Brigadista desde servicio:', data);
      if (data) {
        this.brigadista = data;
        this.brigadista.Fecha_Expedicion_Documento = this.formatearFecha(this.brigadista.Fecha_Expedicion_Documento);
        this.brigadista.Fecha_Nacimiento = this.formatearFecha(this.brigadista.Fecha_Nacimiento);

        this.cargarContactoYTitulos(); // ← Aquí llamamos a la función después de asignar el brigadista
      } else {
        const local = localStorage.getItem('brigadistaSeleccionado');
        if (local) {
          this.brigadista = JSON.parse(local);

          this.brigadista.Fecha_Expedicion_Documento = this.formatearFecha(this.brigadista.Fecha_Expedicion_Documento);
          this.brigadista.Fecha_Nacimiento = this.formatearFecha(this.brigadista.Fecha_Nacimiento);

          this.brigadistaService.setBrigadista(this.brigadista);
          this.cargarContactoYTitulos(); // ← Y también aquí si los datos vienen del localStorage
        } else {
          alert('No se ha seleccionado ningún brigadista.');
          this.router.navigate(['/admin/personal']);
        }
      }
    });
  }


  formatearFecha(fecha: string): string {
    const partes = fecha.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    }
    return fecha;
  }

  cargarContactoYTitulos() {
    const doc = this.brigadista.Numero_Documento;
  
    this.contactoEmergenciaService.buscarContactoPorDocumento(doc).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.contactoEmergencia = data[0];
        }
      },
      error: (error) => {
        console.error('Error al obtener contacto de emergencia', error);
      }
    });
  
    this.tituloService.buscarContactoPorDocumento(doc).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.titulo = data[0];
        }
      },
      error: (error) => {
        console.error('Error al obtener títulos', error);
      }
    });
  }
  

  guardarCambios() {
    if (this.brigadista && this.brigadista.Numero_Documento) {
      const brigadistaActualizado = { ...this.brigadista }; // Clonamos el objeto para no afectar el original

      // Convertimos las fechas solo si existen
      if (brigadistaActualizado.Fecha_Nacimiento) {
        brigadistaActualizado.Fecha_Nacimiento = new Date(brigadistaActualizado.Fecha_Nacimiento).toISOString();
      }
      if (brigadistaActualizado.Fecha_Expedicion_Documento) {
        brigadistaActualizado.Fecha_Expedicion_Documento = new Date(brigadistaActualizado.Fecha_Expedicion_Documento).toISOString();
      }

      // Actualizar brigadista primero
      this.apiService.actualizarBrigadista(
        brigadistaActualizado.Numero_Documento,
        brigadistaActualizado
      ).subscribe({
        next: (respuestaBrigadista) => {
          console.log('Brigadista actualizado:', respuestaBrigadista);

          // Ahora actualizar título
          // Actualizar título
          this.tituloService.actualizartitulo(this.titulo.id, {
            Titulo: this.titulo.Titulo,
            Nivel_Escolaridad: this.titulo.Nivel_Escolaridad,
            Doc_Brigadista: this.titulo.Doc_Brigadista
          }).subscribe({
            next: (respuestaTitulo) => {
              console.log('Título actualizado:', respuestaTitulo);

              // Ahora actualizar contacto de emergencia
              this.contactoEmergenciaService.actualizarContacto(this.contactoEmergencia.id, {
                Nombre_Completo: this.contactoEmergencia.Nombre_Completo,
                Telefono_Movil: this.contactoEmergencia.Telefono_Movil,
                Parentesco: this.contactoEmergencia.Parentesco,
                Correo_Electronico: this.contactoEmergencia.Correo_Electronico,
                Doc_Brigadista: this.contactoEmergencia.Doc_Brigadista
              }).subscribe({
                next: (respuestaContacto) => {
                  console.log('Contacto actualizado:', respuestaContacto);
                  alert('Brigadista, título y contacto actualizados correctamente.');
                  this.router.navigate(['/admin/personal']);
                },
                error: (errorContacto) => {
                  console.error('Error al actualizar contacto de emergencia:', errorContacto);
                  alert('Error al actualizar el contacto de emergencia.');
                }
              });

            },
            error: (errorTitulo) => {
              console.error('Error al actualizar el título:', errorTitulo);
              alert('Error al actualizar el título.');
            }
          });

    },
    error: (error) => {
      console.error('Error al actualizar el brigadista:', error);
      alert('Ocurrió un error al guardar los cambios del brigadista.');
    }
  });

} else {
  alert('Datos incompletos del brigadista.');
}
  }
  
  
  
}
