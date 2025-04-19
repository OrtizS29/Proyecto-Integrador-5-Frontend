import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-brigada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-brigada.component.html',
  styleUrls: ['./actualizar-brigada.component.css']
})
export class ActualizarBrigadaComponent {
  brigada = {
    nombre: '',
    municipio: '',
    fechaInicio: ''
  };

  cantidadPersonal = 6;

  personal = Array.from({ length: 6 }, () => ({ nombre: '', rol: '' }));

  roles = ['Líder', 'Botánico', 'Topógrafo', 'Ecólogo', 'Zootecnista', 'Auxiliar'];

  ajustarCantidadPersonal() {
    if (this.cantidadPersonal < 6) this.cantidadPersonal = 6;
    if (this.cantidadPersonal > 10) this.cantidadPersonal = 10;

    const diferencia = this.cantidadPersonal - this.personal.length;

    if (diferencia > 0) {
      this.personal.push(...Array.from({ length: diferencia }, () => ({ nombre: '', rol: '' })));
    } else if (diferencia < 0) {
      this.personal.splice(this.cantidadPersonal);
    }
  }

  cancelar() {
    // lógica para cancelar
  }

  guardar() {
    // lógica para guardar
  }
}
