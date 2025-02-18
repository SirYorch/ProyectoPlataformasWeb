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
  
  async crearArriendo(uid:string , lugar_id:number,arriendo: any): Promise<void> {
    await lastValueFrom(this.http.post(`${this.apiUrl}/${uid}/${lugar_id}`, arriendo));
  }

  async eliminarArriendo(uid: string): Promise<void> {
    await lastValueFrom(this.http.delete(`${this.apiUrl}/${uid}`));
  }

  
}
