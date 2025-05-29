import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostulacionService } from '../../services/postulacionService';
import { BrigadistaService } from '../../services/brigadistaService';
import { CorreoService } from '../../services/correoService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-postulaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-postulaciones.component.html',
  styleUrl: './gestion-postulaciones.component.css'
})
export class GestionPostulacionesComponent{

  postulaciones: {
    cargo: string;
    estado: string;
    nombreBrigadista: string;
    nombreBrigada: string;
  }[] = [];

  seleccionada: any = null;

  constructor(private route: ActivatedRoute, private postulacionService: PostulacionService,
    private correoService: CorreoService, private router: Router, private brigadistaService: BrigadistaService
  ) {}

  ngOnInit(): void {
    const idBrigada = Number(this.route.snapshot.paramMap.get("idBrigada"));
    if(idBrigada){
      this.postulacionService.buscarPostulacionPorBrigada(idBrigada).subscribe({
        next: (data) => {
          this.postulaciones = data.map((p: any) => ({
            id: p.id,
            cargo: p.cargo,
            estado: p.estado,
            numeroDocumento: p.Brigadista?.Numero_Documento,
            idBrigada: p.Brigada?.id,
            nombreBrigadista: `${p.Brigadista?.Nombre ?? 'N/A'} ${p.Brigadista?.Apellido ?? ''}`,
            nombreBrigada: p.Brigada?.Nombre ?? 'N/A'
          }));
        },
         error: (err) => {
          console.error("Error al obtener postulaciones", err);
          Swal.fire("Error", "No se pudieron cargar las postulaciones", "error");
        }
      });
    }
  }

  seleccionar(postulacion: any): void {
    this.seleccionada = postulacion;
  }

  aprobar(): void {
    if (this.seleccionada && this.seleccionada.estado === "pendiente") {
      const id = this.seleccionada.id;

      const doc = this.seleccionada.numeroDocumento;

      const datosB ={
        Id_Brigada: this.seleccionada.idBrigada,
        Cargo: this.seleccionada.cargo,
      }

      const datos = {estado: "Aceptado"};

      this.postulacionService.actualizarPostulacion(id, datos).subscribe({
        next: () => {
          this.brigadistaService.asignarBrigadista(doc, datosB).subscribe({
            next: () => {

              const idBrigada = this.seleccionada.idBrigada;

              this.enviarCorreoYRedirigir(idBrigada);

              Swal.fire({
                icon: 'success',
                title: 'Aprobado',
                text: `${this.seleccionada.nombreBrigadista} fue aprobado/a exitosamente`,
                timer: 2000,
                showConfirmButton: false
              });
              this.seleccionada.estado = 'Aprobado';
              this.seleccionada = null;
            }
          });
        }
      });
    } else{
        Swal.fire("Acción no permitida", "Solo puedes aprobar postulaciones pendientes", "warning");
        return;
    }
  }

  rechazar(): void {
    if (this.seleccionada && this.seleccionada.estado === "pendiente") {
      const id = this.seleccionada.id;
      const datos = {estado: "Rechazado"};
      console.log(id,datos);
      this.postulacionService.actualizarPostulacion(id,datos).subscribe({
        next: () => {
          Swal.fire({
          icon: 'error',
          title: 'Rechazado',
          text: `${this.seleccionada.nombreBrigadista} fue rechazado/a`,
          timer: 2000,
          showConfirmButton: false
          });
          this.seleccionada.estado = 'Rechazado';
          this.seleccionada = null;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo rechazar la postulación', 'error');
        }
      });
    } else{
        Swal.fire("Acción no permitida", "Solo puedes rechazar postulaciones pendientes", "warning");
        return;
    }
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

}
