import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/usuarios';

  constructor(private http: HttpClient) {}
  async registerUser(uid: string, userData: Record<string, any>): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    try {
      await lastValueFrom(
        this.http.post(`${this.apiUrl}`, { uid, ...userData }, { headers })
      );
      console.log("Usuario registrado en PostgreSQL");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerUsuario(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}`);
  }

  cambiarTipoUsuario(uid: string, nuevoTipo: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiarTipo/${uid}/${nuevoTipo}`, {});
  }
}
