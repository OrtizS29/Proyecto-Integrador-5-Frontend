import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrigadaDataService } from '../../services/brigada-data.service'; // Similar a BrigadistaDataService
import { Brigada } from './../../models/brigada';
import { BrigadaService } from '../../services/brigadaService';
import { BrigadistaService } from '../../services/brigadistaService'; // Asegúrate de tener este servicio
import { ChangeDetectorRef } from '@angular/core';
import { MunicipioService } from '../../services/municipioService';
import { ConglomeradoService } from '../../services/conglomeradoService';
import { Municipio } from '../../models/municipio';
import { Conglomerado } from '../../models/conglomerado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-brigada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-brigada.component.html',
  styleUrls: ['./actualizar-brigada.component.css']
})
export class ActualizarBrigadaComponent implements OnInit {
  municipios: Municipio[] = [];
  conglomerados: Conglomerado[] = [];
  brigada: Brigada = {} as Brigada;
  cantidadPersonal: number = 0;
  personal: any[] = [];  // Lista de personal
  cargos: string[] = [
    'Coordinador Senior',
    'Coordinador Júnior',
    'Ingeniero Forestal',
    'Biólogo o profesional botánico',
    'Coordinador logistico',
    'Responsable frente de trabajo',
    'Auxiliar Forestal',
    'Dendrólogo'];  // Lista de roles predeterminados

  constructor(
    private brigadaService: BrigadaDataService,
    private apiService: BrigadaService,
    private brigadistaService: BrigadistaService,
    private municipioService: MunicipioService,
    private conglomeradoService: ConglomeradoService,
    public router: Router,
    private cdRef: ChangeDetectorRef  // Inyectamos el ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.municipioService.obtenerMunicipios().subscribe({
      next: (data) => this.municipios = data,
      error: (err) => console.error('Error al cargar municipios', err)
    });

    this.conglomeradoService.obtenerConglomerados().subscribe({
      next: (data) => this.conglomerados = data,
      error: (err) => console.error('Error al cargar conglomerados', err)
    });

    this.brigadaService.currentBrigada.subscribe(data => {
      if (data) {
        this.brigada = data;
      } else {
        const local = localStorage.getItem('brigadaSeleccionada');
        if (local) {
          this.brigada = JSON.parse(local);
          this.brigada.Fecha_Inicio = this.formatearFecha(this.brigada.Fecha_Inicio);
          this.brigadaService.cambiarBrigada(this.brigada);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'No se ha seleccionado ninguna brigada.'
          });
          this.router.navigate(['/admin/brigadas']);
          return; // Salimos si no hay brigada
        }
      }

      // Solo si la brigada está bien definida con ID, traemos el personal
      if (this.brigada && this.brigada.id) {
        this.brigadistaService.obtenerBrigadistasPorBrigada(this.brigada.id).subscribe({
          next: (brigadistas) => {
            this.personal = brigadistas.map((b: any) => ({
              nombre: b.Nombre,
              Cargo:String(b.Cargo)
            }));
            this.cantidadPersonal = this.personal.length;
            console.log("Personal cargado:", this.personal);  // Ver si los valores son correctos
            this.cdRef.detectChanges();  // Forzamos que Angular detecte los cambios
          },
          error: (error) => {
            console.error('Error al cargar personal de brigada:', error);
          }
        });
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



  cancelar(): void {
    // Lógica para cancelar la operación, por ejemplo redirigir a la página de brigadas
    this.router.navigate(['/admin/brigadas']);
  }

  guardar(): void {
    // Lógica para guardar la brigada, similar a guardar cambios
    this.guardarCambios();
  }


  guardarCambios() {
    if (this.brigada && this.brigada.id) {
      const brigadaActualizada = {
        Nombre: this.brigada.Nombre,
        Presupuesto: this.brigada.Presupuesto, // <- ya está presente
        Fecha_Inicio: this.brigada.Fecha_Inicio,
        ID_Municipio: this.brigada.Municipio?.id,
        ID_Conglomerado: this.brigada.Conglomerado?.id
      };
      // Convertir fecha a ISO si está presente
      if (brigadaActualizada.Fecha_Inicio) {
        brigadaActualizada.Fecha_Inicio = new Date(brigadaActualizada.Fecha_Inicio).toISOString();
      }

      console.log('Enviando brigada actualizada:', brigadaActualizada); // Verificar que los datos son correctos

      this.apiService.actualizarBrigada(this.brigada.id, brigadaActualizada).subscribe({
        next: (respuesta) => {
          console.log('Brigada actualizada correctamente:', respuesta);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Brigada actualizada exitosamente.'
          });
          this.router.navigate(['/admin/brigadas']);
        },
        error: (error) => {
          console.error('Error al actualizar la brigada:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al guardar los cambios.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Datos incompletos',
        text: 'Verifica que todos los campos estén completos.'
      });
    }
  }


}
