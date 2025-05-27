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
import { CorreoService } from '../../services/correoService';
import { MunicipioService } from '../../services/municipioService';
import { Municipio as MunicipioModel } from '../../models/municipio';
import { Conglomerado } from '../../models/conglomerado';
import { ConglomeradoService } from '../../services/conglomeradoService';



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
  municipios: MunicipioModel[] = [];
  municipioSeleccionado: MunicipioModel | null = null;
  conglomerados: Conglomerado[] = [];
  conglomeradoSeleccionado: Conglomerado | null = null;

  constructor(private router: Router,private brigadistaService: BrigadistaService, private brigadaService:BrigadaService,private correoService: CorreoService,private municipioService: MunicipioService,private conglomeradoService: ConglomeradoService) {}

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
    this.cargarMunicipios();
    this.cargarConglomerados();
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

    cargarMunicipios(): void {
    this.municipioService.obtenerMunicipios().subscribe({
      next: (data) => {
        console.log('Municipios recibidos desde la API:', data);
        this.municipios = data;
      },
      error: (error) => {
        console.error('Error al cargar municipios', error);
      }
    });
  }

  cargarConglomerados(): void {
    this.conglomeradoService.obtenerConglomerados().subscribe({
      next: (data) => {
        console.log('Conglomerados recibidos desde la API:', data);
        this.conglomerados = data;
      },
      error: (error) => {
        console.error('Error al cargar conglomerados', error);
      }
    });
  }


actualizarIntegrantes(): void {
  const cantidad = this.cantidadIntegrantes;

  if (cantidad < 0 || cantidad > 10) {
    this.mensajeError = 'El número de integrantes debe estar entre 0 y 10.';
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
    if (!this.nombreBrigada || !this.municipioSeleccionado || !this.fechaInicio) {
      this.mensajeError = 'Por favor, completa todos los campos principales.';
      return;
    }

    const camposIncompletos = this.integrantes.some(integ => !integ.persona || !integ.rol);
    if (camposIncompletos) {
      this.mensajeError = 'Todos los integrantes deben tener persona y rol asignado.';
      return;
    }

    this.mensajeError = '';

    const nuevaBrigada = {
      Nombre: this.nombreBrigada,
      ID_Municipio: this.municipioSeleccionado.id,
      ID_Conglomerado: this.conglomeradoSeleccionado?.id || '',
      Fecha_Inicio: this.fechaInicio,
      Presupuesto: "0"
    };

    console.log("la nueva brigada", nuevaBrigada);
    this.brigadaService.crearBrigada(nuevaBrigada).subscribe({
      next: (brigadaCreada) => {
        const idBrigada = brigadaCreada.id;
        const integrantesValidos = this.integrantes.filter(i => i.persona);
        if (integrantesValidos.length === 0) {
          // 📩 Si no hay integrantes, igual enviamos el correo
          this.router.navigate(['/admin/brigadas']);
          return;
        }

        let actualizacionesPendientes = integrantesValidos.length;

        integrantesValidos.forEach(integrante => {
          const datosActualizados = {
            Id_Brigada: idBrigada,
            Cargo: integrante.rol
          };

          this.brigadistaService.asignarBrigadista(integrante.persona!.Numero_Documento, datosActualizados)
            .subscribe({
              next: () => {
                actualizacionesPendientes--;
                if (actualizacionesPendientes === 0) {
                  this.enviarCorreoYRedirigir(idBrigada);
                }
              },
              error: err => {
                console.error(`❌ Error actualizando brigadista ${integrante.persona?.Nombre}`, err);
                // Seguimos el flujo aunque falle un brigadista
                actualizacionesPendientes--;
                if (actualizacionesPendientes === 0) {
                  this.enviarCorreoYRedirigir(idBrigada);
                }
              }
            });
        });
      },
      error: (err) => {
        console.error('❌ Error al guardar brigada:', err);
        this.mensajeError = 'Ocurrió un error al guardar la brigada.';
      }
    });
  }

  private enviarCorreoYRedirigir(idBrigada: number): void {
    this.correoService.enviarCorreo(idBrigada)
      .then(() => {
        console.log(`📩 Correo enviado para brigada ID: ${idBrigada}`);
        this.router.navigate(['/admin/brigadas']);
      })
      .catch((error) => {
        console.error('❌ Error al enviar correo:', error);
        this.router.navigate(['/admin/brigadas']);
      });
  }




  cancelar(): void {
    this.router.navigate(['/admin/brigadas']);
  }
}



