import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Brigadista } from './../../models/brigadista';
import { Titulos } from './../../models/titulos';
import { Contacto_Emergencia } from './../../models/contacto-emergencia';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent {
    brigadista: Brigadista = {} as Brigadista;

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

  constructor(public router: Router) {}
}
