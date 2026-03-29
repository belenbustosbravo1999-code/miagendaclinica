import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PacientesApiService, Paciente } from 'src/app/services/pacientes-api.service';
import { DBTaskService } from 'src/app/services/dbtask.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PacientesPage {

  pacientes: Paciente[] = [];
  modoOffline: boolean = false;

  constructor(
    private api: PacientesApiService,
    private db: DBTaskService
  ) {}

  ionViewWillEnter() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.api.getPacientes().subscribe({
      next: async (data) => {
        this.modoOffline = false;
        this.pacientes = data;
        await this.db.guardarPacientesCache(data);
      },
      error: async () => {
        this.modoOffline = true;
        const cache = await this.db.obtenerPacientesCache();
        this.pacientes = cache ?? [];
      }
    });
  }
}
