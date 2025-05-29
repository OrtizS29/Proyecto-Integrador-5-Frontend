import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloService } from '../../services/tituloService';
import { Titulos } from '../../models/titulos';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-brigadista-titulo',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './brigadista-titulo.component.html',
  styleUrls: ['./brigadista-titulo.component.css']
})
export class BrigadistaTituloComponent implements OnInit {
  titulos: Titulos[] = [];
  cargando: boolean = true;
  error: string = '';
  tituloSeleccionado: Titulos | null = null;

  constructor(private tituloService: TituloService) {}

  ngOnInit(): void {
    this.cargarTitulos();
    this.tituloService.obtenerTodos().subscribe({
      next: (data) => {
        this.titulos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los títulos';
        this.cargando = false;
      }
    });
  }
  cargarTitulos(): void {
    this.cargando = true;
    this.tituloService.obtenerTodos().subscribe({
      next: (data) => {
        this.titulos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar títulos';
        this.cargando = false;
      }
    });
  }
  seleccionarFila(titulo: Titulos): void {
    this.tituloSeleccionado = titulo;
  }
  editarTitulo(): void {
    // Por ahora sin funcionalidad
    alert('Funcionalidad de editar próximamente');
  }

  eliminarTitulo(): void {
    // Por ahora sin funcionalidad
    alert('Funcionalidad de eliminar próximamente');
  }
}
