import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  //private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/usuarios'; // URL del backend en Jakarta EE
  // private tarifasUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/tarifas';
  // private espaciosUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/espacios';
  // private horariosUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/horarios';
  private apiUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/usuarios'; // URL del backend en Jakarta EE
  private tarifasUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/tarifas';
  private espaciosUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/espacios';
  private horariosUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/horarios';

  
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private auth: Auth, private router: Router) {}

  //  Actualiza la información del usuario en el servicio
  setUser(data: any): void {
    this.userSubject.next(data);
  }

  getUser(): any {
    return this.userSubject.getValue();
  }

  //  Inicia sesión con Google y verifica en PostgreSQL
  async signInWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      console.log(" Usuario autenticado con Google:", user);

      const userExists = await this.checkUserExists(user.uid);
      return { user, isNewUser: !userExists };
    } catch (error) {
      console.error(' Error al iniciar sesión con Google:', error);
      return null;
    }
  }

  // Verifica si el usuario existe en PostgreSQL
  async checkUserExists(uid: string): Promise<boolean> {
    try {
      const response = await this.http.get<any>(`${this.apiUrl}/${uid}`).toPromise();
      return response !== null && response !== undefined; // Retorna `false` si el usuario no existe
    } catch (error: unknown) {
      const err = error as any;
      if (err.status === 404) {
        return false; // Usuario no existe
      }
      console.error(" Error al verificar usuario en PostgreSQL:", err.message || err);
      return false;
    }
  }
  
  // Registra un usuario en PostgreSQL
  async registerUser(uid: string, userData: any): Promise<void> {
    try {
      console.log(" Intentando registrar usuario en PostgreSQL...", userData);

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http.post(`${this.apiUrl}`, { uid, ...userData }, { headers }).toPromise();
      console.log(" Usuario registrado en PostgreSQL");

      //  Redirigir a la página principal del cliente después del registro
      this.router.navigate(['/cliente/principal']);
    } catch (error: unknown) {
      console.error(" Error al registrar usuario:", error);
    }
  }

  //  Obtiene el tipo de usuario desde PostgreSQL
  async getTipoUsuario(uid: string): Promise<string | null> {
    try {
      const response = await this.http.get<any>(`${this.apiUrl}/${uid}`).toPromise();
      return response ? response.tipo_usuario : null;
    } catch (error: unknown) {
      console.error(" Error al obtener tipo de usuario:", error);
      return null;
    }
  }

  //  Obtiene la información completa del usuario desde PostgreSQL
  async getUserInfo(uid: string): Promise<any | null> {
    try {
      const response = await this.http.get<any>(`${this.apiUrl}/${uid}`).toPromise();
      return response ? response : null;
    } catch (error) {
      console.error(" Error al obtener información del usuario desde PostgreSQL:", error);
      return null;
    }
  }

  // Obtiene todos los usuarios desde PostgreSQL
  async obtenerUsuarios(): Promise<any[]> {
    try {
      const response = await this.http.get<any[]>(`${this.apiUrl}`).toPromise();
      return response || [];
    } catch (error) {
      console.error(" Error al obtener usuarios:", error);
      return [];
    }
  }

  //  Actualiza la información del usuario en PostgreSQL
  async actualizarUsuario(uid: string, datos: any): Promise<void> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      await this.http.put(`${this.apiUrl}/${uid}`, datos, { headers }).toPromise();
      console.log(" Usuario actualizado");
    } catch (error) {
      console.error(" Error al actualizar usuario:", error);
    }
  }

  //  Elimina un usuario de PostgreSQL
  async eliminarUsuario(uid: string): Promise<void> {
    try {
      await this.http.delete(`${this.apiUrl}/${uid}`).toPromise();
      console.log("Usuario eliminado");
    } catch (error) {
      console.error(" Error al eliminar usuario:", error);
    }
  }

  //  Cierra sesión
  logout() {
    return signOut(this.auth);
  }

  //  Métodos para manejar otras entidades
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
      console.log(" Tarifas guardadas");
    } catch (error) {
      console.error(" Error al guardar tarifas:", error);
    }
  }

  async getEspacios(): Promise<any> {
    try {
      return await this.http.get<any>(this.espaciosUrl).toPromise();
    } catch (error) {
      console.error(" Error al obtener espacios:", error);
      return null;
    }
  }

  async saveEspacio(datos: any): Promise<void> {
    try {
      await this.http.post(this.espaciosUrl, datos).toPromise();
      console.log("Espacio guardado");
    } catch (error) {
      console.error(" Error al guardar espacio:", error);
    }
  }

  async getHorarios(): Promise<any> {
    try {
      return await this.http.get<any>(this.horariosUrl).toPromise();
    } catch (error) {
      console.error(" Error al obtener horarios:", error);
      return null;
    }
  }

  async saveHorarios(datos: any): Promise<void> {
    try {
      await this.http.post(this.horariosUrl, datos).toPromise();
      console.log(" Horarios guardados");
    } catch (error) {
      console.error(" Error al guardar horarios:", error);
    }
  }
}
