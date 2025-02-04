import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private horariosUrl = 'http://localhost:8080/api/horarios'; // URL en Jakarta EE

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // ✅ OBTENER TODOS LOS HORARIOS
  async getHorarios(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(this.horariosUrl));
    } catch (error) {
      console.error("❌ Error al obtener horarios:", error);
      return [];
    }
  }

  // ✅ OBTENER CONFIGURACIÓN GENERAL DE HORARIOS
  async getGeneral(): Promise<any> {
    try {
      return await lastValueFrom(this.http.get<any>(`${this.horariosUrl}/general`));
    } catch (error) {
      console.error("❌ Error al obtener configuración general de horarios:", error);
      return null;
    }
  }

  // ✅ GUARDAR CONFIGURACIÓN GENERAL DE HORARIOS
  async saveGeneral(datos: any): Promise<void> {
    try {
      await lastValueFrom(this.http.post(`${this.horariosUrl}/general`, datos, { headers: this.headers }));
      console.log("✅ Configuración general de horarios guardada");
    } catch (error) {
      console.error("❌ Error al guardar configuración general de horarios:", error);
    }
  }

  // ✅ GUARDAR HORARIOS (NUEVOS O MODIFICADOS)
  async saveHorarios(datos: any[]): Promise<void> {
    try {
      await lastValueFrom(this.http.post(this.horariosUrl, datos, { headers: this.headers }));
      console.log("✅ Horarios guardados");
    } catch (error) {
      console.error("❌ Error al guardar horarios:", error);
    }
  }
}
