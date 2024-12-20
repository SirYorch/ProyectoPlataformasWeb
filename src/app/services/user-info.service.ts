import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private storageKey = 'authenticatedUser'; // Clave para almacenar el usuario en localStorage
  private otro = 'otro'; // Clave para almacenar el usuario en localStorage

  constructor() {}

  // Guardar usuario en el localStorage
  saveUser(user: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user)); // Convertir a JSON y almacenar
  }

  // Guardar usuario en el localStorage
  saveOtherUser(user: any): void {
    localStorage.setItem(this.otro, JSON.stringify(user)); // Convertir a JSON y almacenar
  }

  // Leer usuario desde el localStorage
  getUser(): any {
    const userJson = localStorage.getItem(this.storageKey);
    return userJson ? JSON.parse(userJson) : null; // Parsear de vuelta a objeto si existe
  }
  // Leer usuario desde el localStorage
  getOtherUser(): any {
    const userJson = localStorage.getItem(this.otro);
    return userJson ? JSON.parse(userJson) : null; // Parsear de vuelta a objeto si existe
  }
  

  // Eliminar usuario del localStorage (logout)
  clearUser(): void {
    localStorage.removeItem(this.storageKey); // Borrar usuario de localStorage
  }

  // Verificar si un usuario está autenticado
  isAuthenticated(): boolean {
    return this.getUser() !== null; // Si existe un usuario guardado, está autenticado
  }
}
