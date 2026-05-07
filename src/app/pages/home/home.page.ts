import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { trigger, transition, style, animate } from '@angular/animations';

import { MisDatosComponent } from '../../components/mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from '../../components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from '../../components/certificaciones/certificaciones.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MisDatosComponent,
    ExperienciaLaboralComponent,
    CertificacionesComponent
  ],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' })),
      ]),
    ]),
  ]
})
export class HomePage {
  segmentoActual: string = 'mis-datos';

  constructor() {}
}
