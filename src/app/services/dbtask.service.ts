import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {

  // ========================
  // KEYS
  // ========================
  private readonly ACTIVE_USER_KEY = 'ACTIVE_USER';
  private readonly PACIENTES_CACHE_KEY = 'PACIENTES_CACHE';

  // ========================
  // STORAGE INTERNO
  // ========================
  private _storage!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa Storage
  private async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  // ========================
  // SESIÓN (LOGIN / LOGOUT)
  // ========================
  async guardarSesion(username: string): Promise<void> {
    await this._storage.set(this.ACTIVE_USER_KEY, username);
  }

  async existeSesionActiva(): Promise<boolean> {
    const user = await this._storage.get(this.ACTIVE_USER_KEY);
    return !!user;
  }

  async cerrarSesion(): Promise<void> {
    await this._storage.remove(this.ACTIVE_USER_KEY);
  }

  // ========================
  // CACHE OFFLINE PACIENTES
  // ========================
  async guardarPacientesCache(pacientes: any[]): Promise<void> {
    await this._storage.set(this.PACIENTES_CACHE_KEY, pacientes);
  }

  async obtenerPacientesCache(): Promise<any[] | null> {
    return await this._storage.get(this.PACIENTES_CACHE_KEY);
  }
}
