import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  private apiUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/lugares';

  constructor(private http: HttpClient) {}

  async getLugares(): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
      } catch (error) {
        console.error("Error al obtener Lugares:", error);
        return [];
      }
    }

    async entrar(id:string, dato:any): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.put<any[]>(`${this.apiUrl}/entrar/${id}`,dato));
      } catch (error) {
        console.error("Error al entrar:", error);
        return [];
      }
    }
    async reservar(id:string, dato:any): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.put<any[]>(`${this.apiUrl}/reservar/${id}`,dato));
      } catch (error) {
        console.error("Error al reservar:", error);
        return [];
      }
    }
    async arrendar(id:string, dato:any): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.put<any[]>(`${this.apiUrl}/arrendar/${id}`,dato));
      } catch (error) {
        console.error("Error al arrendar:", error);
        return [];
      }
    }


}
