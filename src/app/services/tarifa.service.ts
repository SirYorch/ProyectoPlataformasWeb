import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  //private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/tarifas';
  private apiUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/tarifas';

  constructor(private http: HttpClient) {}

  async obtenerTarifas(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
    } catch (error) {
      console.error("Error al obtener tarifas:", error);
      return [];
    }
  }

  async crearTarifa(tarifa: any): Promise<void> {
    await lastValueFrom(this.http.post(this.apiUrl, tarifa));
  }

  async actualizarTarifa(id: number, datos: any): Promise<void> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      await lastValueFrom(this.http.put(`${this.apiUrl}/${id}`, datos, { headers }));
      console.log(`Tarifa ${id} actualizada correctamente`);
    } catch (error) {
      console.error("Error al actualizar tarifa:", error);
    }
  }

  async eliminarTarifa(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }
}
