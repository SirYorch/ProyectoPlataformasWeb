import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {
  async enviarCorreo(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/enviar`));
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }
  async borrarReservas(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/borrar`));
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }

  private apiUrl = 'http://192.168.60.190:8080/parking-1.0-SNAPSHOT/api/publico';

  async obtenerDatos(): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
      }
    }

  async ActualizarDatos(data: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.put<any>(this.apiUrl, data));
    } catch (error) {
      return null;
    }
  }
    
  constructor(private http: HttpClient) {}
}
