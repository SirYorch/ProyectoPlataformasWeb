import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private apiUrl = 'http://localhost:8080/ups_edu_-1.0-SNAPSHOT/api/tarifas'; //  URL del backend en Jakarta EE

  constructor(private http: HttpClient) {}

  async obtenerTarifas(): Promise<any> {
    try {
      return await lastValueFrom(this.http.get<any>(this.apiUrl));
    } catch (error) {
      console.error(" Error al obtener tarifas:", error);
      return null;
    }
  }
}
