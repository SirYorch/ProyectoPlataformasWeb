import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadService {
  private firestore = inject(Firestore);

  // Método para obtener todos los documentos de una colección
  getCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }); // Incluye el ID del documento
  }
  collectionUsuarios = "users";
  collectionTarifas = "tarifas";
  collectionEstado = "estado";
  tarifasDoc = "enaxwCosNBJTsbLgfeNN";
  estadoDoc = "4SRsQFKJUMi5bJo0dx21";
  // Método para obtener un documento específico por su ID
  getDocument( docId: string): Observable<any> {
    const docRef = doc(this.firestore, `${this.collectionUsuarios}/${docId}`);
    return docData(docRef, { idField: 'id' }); // Incluye el ID del documento
  }
  getTarifas(): Observable<any> {
    const docRef = doc(this.firestore, `${this.collectionTarifas}/${this.tarifasDoc}`);
    return docData(docRef, { idField: 'id' }); // Incluye el ID del documento
  }
  getEstado(): string {
    const docRef = doc(this.firestore, `${this.collectionEstado}/${this.estadoDoc}`);
    
    const estado = docData(docRef, { idField: 'id' }).exists() ? docData(docRef, { idField: 'id' }).data() : null;

    return estado.est; // Incluye el ID del documento
  }
}
