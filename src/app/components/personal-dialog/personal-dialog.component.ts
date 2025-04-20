import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
    // Aquí puedes importar más módulos si los necesitas
  ],
  templateUrl: './personal-dialog.component.html',
  styleUrl: './personal-dialog.component.css'
})
export class PersonalDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number }  // 👈 inyectamos el ID de brigada
  ) {}

  ngOnInit(): void {
    console.log('ID de brigada recibido:', this.data.id);
    // Aquí puedes llamar a un servicio para obtener el personal asignado
  }

  personalAsignado = [
    { nombre: '', rol: '' },
    { nombre: '', rol: '' },
    { nombre: '', rol: '' },
    { nombre: ' ', rol: '' },
    { nombre: ' ', rol: ' ' },
    { nombre: ' ', rol: '' }
  ];
}

