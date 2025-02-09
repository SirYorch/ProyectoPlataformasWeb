import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacioService {

  private apiUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/espacios';

  constructor(private http: HttpClient) {}
  

  async getEspacios(): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
      } catch (error) {
        console.error("Error al obtener espacios:", error);
        return [];
      }
    }
  async saveDatos(espacio:any){
    try {
        await lastValueFrom(this.http.put(`${this.apiUrl}`, espacio));
    } catch (error) {
    }
  }

}
