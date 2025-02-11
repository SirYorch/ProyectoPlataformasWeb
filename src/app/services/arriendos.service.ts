import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDoc, getDocs, collection, query, where } from '@angular/fire/firestore';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArriendosService {

  private apiUrl = 'http://localhost:8080/parking-1.0-SNAPSHOT/api/arriendos';
  
  constructor(private http: HttpClient) {}
  
  async obtenerArriendos(): Promise<any> {
    try {
      const arriendos = await lastValueFrom(this.http.get<any>(this.apiUrl));
  
  
      return arriendos;
    } catch (error) {
      console.error(" Error al obtener los arriendos:", error);
      return null;
    }
  }
}
