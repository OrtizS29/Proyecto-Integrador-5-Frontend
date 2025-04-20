import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { Contacto_Emergencia } from '../../models/contacto-emergencia'; // Ajusta la ruta si es necesario

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí deberías traer tus datos reales desde un servicio
    this.dataSource.data = [
      {
        id: 1,
        Nombre_Completo: 'Ana López',
        Parentesco: 'Madre',
        Telefono_Movil: '3123456789',
        Correo_Electronico: 'ana@example.com',
        Doc_Brigadista: 1001
      },
      {
        id: 2,
        Nombre_Completo: 'Carlos Ruiz',
        Parentesco: 'Hermano',
        Telefono_Movil: '3009876543',
        Correo_Electronico: 'carlos@example.com',
        Doc_Brigadista: 1002
      }
    ];
  }

  seleccionarFila(row: Contacto_Emergencia): void {
    this.filaSeleccionada = row;
  }

  irAActualizarSeleccionado(): void {
    const contacto = this.filaSeleccionada;
    if (contacto) {
      // Puedes guardar el contacto en el localStorage si lo necesitas
      localStorage.setItem('contactoSeleccionado', JSON.stringify(contacto));
      this.router.navigate(['/admin/editar-contacto', contacto.id]);
    }
  }

  eliminar(contacto: Contacto_Emergencia): void {
    if (contacto) {
      this.dataSource.data = this.dataSource.data.filter(c => c.id !== contacto.id);
      this.filaSeleccionada = null;
    }
  }
}
