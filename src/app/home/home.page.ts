import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // ✅ Importación agregada

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router // ✅ Inyectado
  ) {
    this.form = this.fb.group({
      usuario: ['Belen', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      const t = await this.toastCtrl.create({
        message: 'Por favor, complete todos los campos',
        duration: 2000,
        color: 'danger',
      });
      await t.present();
      return;
    }

    const usuario = (this.form.value.usuario || '').trim().toLowerCase();
    const password = (this.form.value.password || '').trim();

    if (usuario === 'belen' && password === '1234') {
      const toast = await this.toastCtrl.create({
        message: `Bienvenida ${this.form.value.usuario}`,
        duration: 1500,
        color: 'success',
      });
      await toast.present();

      // ✅ Redirección automática a "Registro de Pacientes"
      this.router.navigate(['/pacientes']);

    } else {
      const toast = await this.toastCtrl.create({
        message: 'Usuario o contraseña incorrectos',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
    }
  }
}
