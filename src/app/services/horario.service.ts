import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  async guardarHorario(horario: { id: any; nombre: string; fechaInicio: number; fechaFin: number; }) {
    try {
      return await lastValueFrom(this.http.put(`${this.horariosUrl}/${horario.id}`,horario));
    } catch (error) {
      console.error(" Error al obtener horarios:", error);
      return [];
    }
  }
  //private horariosUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/horarios'; // URL en Jakarta EE
  private horariosUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/horarios'; // URL en Jakarta EE

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // OBTENER TODOS LOS HORARIOS
  async getHorarios(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(this.horariosUrl));
    } catch (error) {
      console.error(" Error al obtener horarios:", error);
      return [];
    }
  }

  // GUARDAR HORARIOS (NUEVOS O MODIFICADOS)
  async saveHorarios(datos: any): Promise<void> {
    try {
      await lastValueFrom(this.http.post(this.horariosUrl, datos, { headers: this.headers }));
      console.log("Horarios guardados");
    } catch (error) {
      console.error("Error al guardar horarios:", error);
    }
  }
  // GUARDAR HORARIOS (NUEVOS O MODIFICADOS)
  async deleteHorarios(id:number): Promise<void> {
    try {
      await lastValueFrom(this.http.delete(`${this.horariosUrl}/${id}`));
      console.log("Horarios guardados");
    } catch (error) {
      console.error("Error al guardar horarios:", error);
    }
  }
}
