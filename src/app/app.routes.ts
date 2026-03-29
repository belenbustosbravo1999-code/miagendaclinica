import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'citas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/citas/citas.page').then((m) => m.CitasPage),
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/pacientes/pacientes.page').then((m) => m.PacientesPage),
  },
  {
  path: 'mis-datos',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./components/mis-datos/mis-datos.component').then((m) => m.MisDatosComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
