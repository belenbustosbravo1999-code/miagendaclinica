import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  animations: [
    trigger('zoomFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class MisDatosComponent {

  fotoBase64: string | null = null;

  constructor() {}

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.fotoBase64 = image.dataUrl ?? null;
  }

  limpiarFoto() {
    this.fotoBase64 = null;
  }
}
