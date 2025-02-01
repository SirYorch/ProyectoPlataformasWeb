import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/usuarios';

  constructor(private http: HttpClient) {}

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
