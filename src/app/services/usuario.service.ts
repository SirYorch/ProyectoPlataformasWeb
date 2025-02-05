import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/usuarios';

  constructor(private http: HttpClient) {}

  async obtenerUsuarios(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
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
        await lastValueFrom(this.http.put(`${this.apiUrl}/${uid}`, datos));
        console.log("Usuario actualizado correctamente");
        alert("Usuario actualizado con éxito.");
    } catch (error) {
        console.error(" Error al actualizar usuario:", error);
        alert("Error al actualizar usuario.");
    }
}


  async cambiarTipoUsuario(uid: string, nuevoTipo: string): Promise<void> {
    try {
      await lastValueFrom(this.http.put(`${this.apiUrl}/cambiarTipo/${uid}/${nuevoTipo}`, {}));
      console.log(` Usuario ${uid} ahora es ${nuevoTipo}`);
    } catch (error) {
      console.error(" Error al cambiar tipo de usuario:", error);
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
