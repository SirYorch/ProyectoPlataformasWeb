import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDoc, getDocs, collection, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArriendosService {
  private arriendosCollection = collection(this.firestore, 'arriendos');
  private usersCollection = collection(this.firestore, 'users'); // Referencia a la colección de usuarios

  constructor(private firestore: Firestore) {}

  // Crear o actualizar un arriendo utilizando la placa como ID
  crearArriendoPorPlaca(placa: string, data: any) {
    const arriendoDoc = doc(this.firestore, `arriendos/${placa}`);
    return setDoc(arriendoDoc, data, { merge: true }); // Merge evita sobrescribir todo el documento
  }

  // Obtener un arriendo por su placa
  obtenerArriendoPorPlaca(placa: string) {
    const arriendoDoc = doc(this.firestore, `arriendos/${placa}`);
    return getDoc(arriendoDoc);
  }

  // Obtener todos los arriendos
  obtenerTodosLosArriendos() {
    return getDocs(this.arriendosCollection);
  }

  // Buscar información del usuario por placa
  obtenerUsuarioPorPlaca(placa: string) {
    const userQuery = query(this.usersCollection, where('placa', '==', placa));
    return getDocs(userQuery); // Devuelve un conjunto de documentos que coinciden
  }

  // Eliminar un arriendo por su placa
  eliminarArriendoPorPlaca(placa: string) {
    const arriendoDoc = doc(this.firestore, `arriendos/${placa}`);
    return deleteDoc(arriendoDoc);
  }
}
