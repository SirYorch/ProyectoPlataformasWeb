import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/reservas';
 
   constructor(private http: HttpClient) {}

     async obtenerReservas(): Promise<any[]> {
       try {
         return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
       } catch (error) {
         return [];
       }
     }

  async eliminarReserva(id: number): Promise<void> {
      try {
          await lastValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      } catch (error) {
      }
  }
 
}
