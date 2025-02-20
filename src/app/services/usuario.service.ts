import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/usuarios';
  private apiUrl = 'http://192.168.60.190:8080/parking-1.0-SNAPSHOT/api/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error("Error al obtener usuarios:", error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }  
  
  async obtenerUsuario(uid: string): Promise<any> {
    try {
      const usuario = await lastValueFrom(this.http.get<any>(`${this.apiUrl}/${uid}`));
  
      //  Verificar si el usuario es CLIENTE y tiene una placa
      if (usuario.tipo_usuario === "CLIENTE" && usuario.placa) {
        console.log("Usuario Cliente con Placa:", usuario.placa);
      }
      return usuario;
    } catch (error) {
      console.error(" Error al obtener usuario:", error);
      return null;
    }
  }
  async actualizarUsuario(uid: string, datos: any): Promise<void> {
    try {
        console.log(" Enviando actualización de usuario:", uid, datos);
        await lastValueFrom(this.http.put(`${this.apiUrl}/${uid}`, datos));
        console.log(" Usuario actualizado correctamente");
    } catch (error) {
        console.error(" Error al actualizar usuario:", error);
        alert("Error al actualizar usuario.");
    }
}
  async eliminarUsuario(uid: string): Promise<void> {
    try {
        await lastValueFrom(this.http.delete(`${this.apiUrl}/${uid}`));
        console.log(` Usuario ${uid} eliminado correctamente`);
        alert("Usuario eliminado con éxito.");
    } catch (error) {
        console.error(" Error al eliminar usuario:", error);
        alert("Error al eliminar usuario.");
    }
}
}
