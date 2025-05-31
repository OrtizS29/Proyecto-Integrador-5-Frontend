import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactoEmergenciaService } from '../../services/contacto_emergenciaService';
import { Contacto_Emergencia } from '../../models/contacto-emergencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-contacto',
  templateUrl: './actualizar-contacto.component.html',
  styleUrls: ['./actualizar-contacto.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class ActualizarContactoComponent implements OnInit {
  contactoForm!: FormGroup;
  contactoId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private contactoService: ContactoEmergenciaService
  ) {}

  ngOnInit(): void {
    this.contactoId = Number(this.route.snapshot.paramMap.get('id'));

    this.contactoForm = this.fb.group({
      Nombre_Completo: ['', Validators.required],
      Telefono_Movil: ['', Validators.required],
      Parentesco: ['', Validators.required],
      Correo_Electronico: ['', [Validators.required, Validators.email]]
    });

    this.cargarDatos();
  }

  cargarDatos(): void {
    this.contactoService.obtenerTodos().subscribe((contactos) => {
      const contacto = contactos.find(c => c.id === this.contactoId);
      if (contacto) {
        this.contactoForm.patchValue(contacto);
      }
    });
  }

  guardar(): void {
    if (this.contactoForm.valid) {
      this.contactoService.actualizarContacto(this.contactoId, this.contactoForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'El contacto fue actualizado correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/admin/brigadista-contacto']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al actualizar el contacto.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/admin/brigadista-contacto']);
  }
}
