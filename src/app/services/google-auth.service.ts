import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/usuarios'; // URL del backend en Jakarta EE
  private tarifasUrl = 'http://localhost:8080/api/tarifas';
  private espaciosUrl = 'http://localhost:8080/api/espacios';
  private horariosUrl = 'http://localhost:8080/api/horarios';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private auth: Auth, private router: Router) {}

  setUser(data: any): void {
    this.userSubject.next(data);
  }

  getUser(): any {
    return this.userSubject.getValue();
  }

  async signInWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      const userExists = await this.checkUserExists(user.uid);
      return { user, isNewUser: !userExists };
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      return null;
    }
  }

  async checkUserExists(uid: string): Promise<boolean> {
    try {
        const response = await this.http.get<any>(`${this.apiUrl}/${uid}`).toPromise();
        return response !== null && response !== undefined; // Devuelve `false` si no encuentra el usuario
    } catch (error: unknown) { // Agregamos ": unknown" explícitamente
        const err = error as any; // Convertimos error a "any" para evitar problemas de tipado
        if (err.status === 404) {
            return false; // Si es error 404, significa que el usuario no existe aún
        }
        console.error("Error al verificar si el usuario existe:", err.message || err);
        return false; // En caso de otros errores, asumir que no existe
    }
}


async registerUser(uid: string, userData: any): Promise<void> {
  try {
      await this.http.post(`${this.apiUrl}`, { uid, ...userData }).toPromise();
      console.log("Usuario registrado en PostgreSQL");
  } catch (error: unknown) {
      const err = error as any; // Convertimos error a "any"
      console.error("Error al registrar usuario:", err.message || err);
  }
}

async getTipoUsuario(uid: string): Promise<string | null> {
  try {
      const response = await this.http.get<any>(`${this.apiUrl}/${uid}`).toPromise();
      return response ? response.tipo_usuario : null;
  } catch (error: unknown) {
      const err = error as any; // Convertimos error a "any"
      console.error("Error al obtener tipo de usuario:", err.message || err);
      return null;
  }
}



  async obtenerUsuarios(): Promise<any[]> {
    try {
      const response = await this.http.get<any[]>(`${this.apiUrl}`).toPromise();
      return response || []; // SI ES `undefined`, DEVOLVER UN ARRAY VACÍO
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return []; //  MANTENER COMPATIBILIDAD DE TIPO
    }

  }
  async getUserInfo(uid: string): Promise<any | null> {
    try {
        const response = await this.http.get<any>(`${this.apiUrl}/${uid}`).toPromise();
        return response ? response : null;
    } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        return null;
    }
}
async getGeneral(): Promise<any> {
  try {
      return await this.http.get<any>(`${this.apiUrl}/general`).toPromise();
  } catch (error) {
      console.error("Error al obtener datos generales:", error);
      return null;
  }
}

async saveGeneral(datos: any): Promise<void> {
  try {
      await this.http.post(`${this.apiUrl}/general`, datos).toPromise();
      console.log("Datos generales guardados");
  } catch (error) {
      console.error("Error al guardar datos generales:", error);
  }
}


  

  async actualizarUsuario(uid: string, datos: any): Promise<void> {
    try {
      await this.http.put(`${this.apiUrl}/${uid}`, datos).toPromise();
      console.log("Usuario actualizado");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  }

  async eliminarUsuario(uid: string): Promise<void> {
    try {
      await this.http.delete(`${this.apiUrl}/${uid}`).toPromise();
      console.log("Usuario eliminado");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  }

  logout() {
    return signOut(this.auth);
  }

  // Métodos para manejar otras entidades
  async getTarifas(): Promise<any> {
    try {
      return await this.http.get<any>(this.tarifasUrl).toPromise();
    } catch (error) {
      console.error("Error al obtener tarifas:", error);
      return null;
    }
  }

  async saveTarifas(datos: any): Promise<void> {
    try {
      await this.http.post(this.tarifasUrl, datos).toPromise();
      console.log("Tarifas guardadas");
    } catch (error) {
      console.error("Error al guardar tarifas:", error);
    }
  }

  async getEspacios(): Promise<any> {
    try {
      return await this.http.get<any>(this.espaciosUrl).toPromise();
    } catch (error) {
      console.error("Error al obtener espacios:", error);
      return null;
    }
  }

  async saveEspacio(datos: any): Promise<void> {
    try {
      await this.http.post(this.espaciosUrl, datos).toPromise();
      console.log("Espacio guardado");
    } catch (error) {
      console.error("Error al guardar espacio:", error);
    }
  }

  async getHorarios(): Promise<any> {
    try {
      return await this.http.get<any>(this.horariosUrl).toPromise();
    } catch (error) {
      console.error("Error al obtener horarios:", error);
      return null;
    }
  }

  async saveHorarios(datos: any): Promise<void> {
    try {
      await this.http.post(this.horariosUrl, datos).toPromise();
      console.log("Horarios guardados");
    } catch (error) {
      console.error("Error al guardar horarios:", error);
    }
  }
}
