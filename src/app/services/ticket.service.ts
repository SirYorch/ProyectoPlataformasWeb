import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://192.168.60.190:8080/parking-1.0-SNAPSHOT/api/tickets';

  constructor(private http: HttpClient) {}

    async obtenerTciekts(): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.get<any[]>(this.apiUrl));
      } catch (error) {
        console.error("Error al obtener ticekts:", error);
        return [];
      }
    }
    async obtenerTicketsUsuario(uid:string): Promise<any[]> {
      try {
        return await lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/${uid}`));
      } catch (error) {
        console.error("Error al obtener ticekts:", error);
        return [];
      }
    }

}
