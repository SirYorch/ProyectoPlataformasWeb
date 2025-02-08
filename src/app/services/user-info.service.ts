import { Injectable } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  obtenerUsuario(uid: any): any {
    throw new Error('Method not implemented.');
  }

  user:any = null; //necesario para poder hacer validaciones automaticas.


  async validarUsuario(usuario:any): Promise<string | void> {
    this.user = usuario;

    if (!this.user) return 'NO_USER';

    try {
      const userExists = await this.googleAuthService.checkUserExists(this.user.uid);

      if (userExists) {
        const tipoUsuario = await this.googleAuthService.getTipoUsuario(this.user.uid);
        this.saveUser({ uid: this.user.uid });

        if (tipoUsuario === 'ADMIN') {
          return 'ADMIN' ;
        } else if (tipoUsuario === 'CLIENTE') {
          return 'CLIENTE' ;
        }
      }
    } catch (error) {
        return 'ERROR';
      }
  
      return 'UNKNOWN';
    }
  
  private storageKey = 'authenticatedUser'; // Clave para almacenar el usuario en localStorage
  private otro = 'otro'; // Clave para almacenar el usuario en localStorage

  constructor(private googleAuthService: GoogleAuthService) {}

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
