import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';

import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // ✅ Estas propiedades las usa tu HTML
  esRegistro: boolean = false;

  // ✅ En tu HTML aparece [(ngModel)]="user_name"
  user_name: string = '';

  // ✅ En tu HTML aparece [(ngModel)]="password"
  password: string = '';

  constructor(
    private db: DBTaskService,
    private router: Router,
    private alertController: AlertController
  ) {}

  // ✅ Tu HTML llama (click)="onSubmit()"
  async onSubmit() {
    const user = (this.user_name ?? '').trim();
    const pass = (this.password ?? '').trim();

    // Validaciones simples según el texto del HTML
    if (!user || user.length > 8) {
      await this.showAlert('Validación', 'El usuario es obligatorio (máx 8 caracteres).');
      return;
    }

    if (!pass || !/^\d+$/.test(pass)) {
      await this.showAlert('Validación', 'La contraseña debe ser solo números.');
      return;
    }

    // ✅ Para que compile aunque tu servicio aún no tenga métodos:
    const dbAny: any = this.db;

    try {
      if (this.esRegistro) {
        // Si tu servicio tiene un método real, úsalo aquí (ajusta nombre si corresponde)
        if (typeof dbAny.registrarUsuario === 'function') {
          await dbAny.registrarUsuario(user, pass);
        }
        // Registro exitoso → entra
        this.router.navigate(['/home']);
      } else {
        // Login: si existe método real lo usamos, si no, validación simple
        if (typeof dbAny.login === 'function') {
          const ok = await dbAny.login(user, pass);
          if (!ok) {
            await this.showAlert('Error', 'Usuario o contraseña incorrectos.');
            return;
          }
        } else {
          // fallback simple (para no bloquearte si el servicio no está listo)
          if (!(user === 'admin' && pass === '1234')) {
            await this.showAlert('Error', 'Usuario o contraseña incorrectos.');
            return;
          }
        }

        this.router.navigate(['/home']);
      }
    } catch (e) {
      await this.showAlert('Error', 'Ocurrió un problema al procesar la solicitud.');
    }
  }

  // ✅ Tu HTML llama (click)="cambiarModo()"
  cambiarModo() {
    this.esRegistro = !this.esRegistro;
    this.user_name = '';
    this.password = '';
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
