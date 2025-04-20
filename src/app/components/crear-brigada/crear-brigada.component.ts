import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { BrigadistaService } from './../../services/brigadistaService';
import { Brigadista } from '../../models/brigadista';
import { BrigadaService } from '../../services/brigadaService';


@Component({
  selector: 'app-crear-brigada',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule
  ],
  templateUrl: './crear-brigada.component.html',
  styleUrls: ['./crear-brigada.component.css']
})
export class CrearBrigadaComponent {
  constructor(private router: Router,private brigadistaService: BrigadistaService, private brigadaService:BrigadaService) {}

  nombreBrigada: string = '';
  municipio: string = '';
  fechaInicio: Date | null = null;

  cantidadIntegrantes: number = 6;

  integrantes: { persona: Brigadista | null; rol: string }[] = Array.from({ length: 6 }, () => ({
    persona: null,
    rol: ''
  }));

  mensajeError: string = '';

  // Ejemplo de brigadistas disponibles
  brigadistasDisponibles: Brigadista[] = [];

  rolesDisponibles: string[] = [
    'Coordinador Senior',
    'Coordinador Junior',
    'Ingeniero forestal',
    'Biólogo o profesional botánico',
    'Coordinador logístico',
    'Responsable frente de trabajo',
    'Auxiliar forestal',
    'Dendrólogo'
  ];

  ngOnInit(): void {
    this.cargarBrigadistasDisponibles();
  }

  cargarBrigadistasDisponibles(): void {
    this.brigadistaService.obtenerBrigadistasPorBrigada(null).subscribe({
      next: (data) => {
        this.brigadistasDisponibles = data;
      },
      error: (error) => {
        console.error('Error al cargar brigadistas disponibles', error);
      }
    });
  }


  actualizarIntegrantes(): void {
    const cantidad = this.cantidadIntegrantes;

    if (cantidad < 6 || cantidad > 10) {
      this.mensajeError = 'El número de integrantes debe estar entre 6 y 10.';
      return;
    }

    this.mensajeError = '';

    if (cantidad > this.integrantes.length) {
      for (let i = this.integrantes.length; i < cantidad; i++) {
        this.integrantes.push({ persona: null, rol: '' });
      }
    } else if (cantidad < this.integrantes.length) {
      this.integrantes = this.integrantes.slice(0, cantidad);
    }
  }

  guardarBrigada(): void {
    if (!this.nombreBrigada || !this.municipio || !this.fechaInicio) {
      this.mensajeError = 'Por favor, completa todos los campos principales.';
      return;
    }
  
    const camposIncompletos = this.integrantes.some(integ => !integ.persona || !integ.rol);
    if (camposIncompletos) {
      this.mensajeError = 'Todos los integrantes deben tener persona y rol asignado.';
      return;
    }
  
    this.mensajeError = '';
  
    // 1. Crear el objeto brigada sin los integrantes
    const nuevaBrigada = {
      Nombre: this.nombreBrigada,
      Municipio: this.municipio,
      Fecha_Inicio: this.fechaInicio
    };
  
    // 2. Llamar al servicio para crear la brigada
    this.brigadaService.crearBrigada(nuevaBrigada).subscribe({
      next: (brigadaCreada) => {
        const idBrigada = brigadaCreada.id;
  
        // 3. Actualizar cada brigadista con el id de la brigada y el rol (cargo)
        this.integrantes.forEach(integrante => {
          if (integrante.persona) {
            const datosActualizados = {
              Id_Brigada: idBrigada,
              Cargo: integrante.rol
            };
            console.log(datosActualizados.Id_Brigada)
            this.brigadistaService.asignarBrigadista(integrante.persona.Numero_Documento, datosActualizados)
              .subscribe({
                next: () => console.log(`✅ Brigadista ${integrante.persona?.Nombre} actualizado.`),
                error: err => console.error(`❌ Error actualizando brigadista ${integrante.persona?.Nombre}`, err)
              });
          }
        });
  
        // 4. Redirigir o mostrar mensaje
        console.log('✅ Brigada guardada con éxito');
        this.router.navigate(['/admin/brigadas']);
      },
      error: (err) => {
        console.error('❌ Error al guardar brigada:', err);
        this.mensajeError = 'Ocurrió un error al guardar la brigada.';
      }
    });
  }
  

  cancelar(): void {
    this.router.navigate(['/admin/brigadas']);
  }
}



