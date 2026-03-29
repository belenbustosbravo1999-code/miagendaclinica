import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CitasPage {
  especialidades = [
    {
      nombre: 'Rehabilitación Oral',
      horas: ['09:00', '10:00', '11:30', '15:00', '16:30'],
    },
    {
      nombre: 'Ortodoncia',
      horas: ['08:30', '09:30', '11:00', '14:30', '17:00'],
    },
    {
      nombre: 'Implantes',
      horas: ['09:00', '10:30', '13:00', '15:30'],
    },
  ];

  especialidadSeleccionada: any = null;
  horaSeleccionada: string = '';

  seleccionarEspecialidad(especialidad: any) {
    this.especialidadSeleccionada = especialidad;
    this.horaSeleccionada = '';
  }

  seleccionarHora(hora: string) {
    this.horaSeleccionada = hora;
  }
}

