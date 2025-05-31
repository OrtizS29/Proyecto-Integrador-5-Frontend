import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { ContactoEmergenciaService } from '../../services/contacto_emergenciaService'; // Ajusta si la ruta cambia
import { Contacto_Emergencia } from '../../models/contacto-emergencia';

@Component({
  selector: 'app-brigadista-contacto',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './brigadista-contacto.component.html',
  styleUrl: './brigadista-contacto.component.css'
})
export class BrigadistaContactoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'Nombre_Completo',
    'Parentesco',
    'Telefono_Movil',
    'Correo_Electronico',
    'Doc_Brigadista'
  ];

  dataSource = new MatTableDataSource<Contacto_Emergencia>([]);
  filaSeleccionada: Contacto_Emergencia | null = null;

  constructor(private router: Router,private contactoService: ContactoEmergenciaService) {}

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.contactoService.obtenerTodos().subscribe(
      (contactos: Contacto_Emergencia[]) => {
        this.dataSource.data = contactos;
      },
      (error) => {
        console.error('Error al cargar los contactos:', error);
        alert('Error al cargar los contactos de emergencia.');
      }
    );
  }
  seleccionarFila(row: Contacto_Emergencia): void {
    this.filaSeleccionada = row;
  }

  irAActualizarSeleccionado(): void {
    const contacto = this.filaSeleccionada;
    if (contacto) {
      // Puedes guardar el contacto en el localStorage si lo necesitas
      localStorage.setItem('contactoSeleccionado', JSON.stringify(contacto));
      this.router.navigate(['/admin/actualizar-contacto', contacto.id]);
    }
  }

  eliminar(contacto: Contacto_Emergencia): void {
    if (contacto) {
      this.dataSource.data = this.dataSource.data.filter(c => c.id !== contacto.id);
      this.filaSeleccionada = null;
    }
  }
}
