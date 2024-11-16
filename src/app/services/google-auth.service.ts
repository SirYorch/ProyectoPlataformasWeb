import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc ,getDocs,setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private firestore = inject(Firestore);
  public router = inject(Router);

  constructor(private auth: Auth) {}
  
  // Observable para los datos del usuario
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();


  setUser(data: any): void {
    this.userSubject.next(data); // Actualiza el usuario
  }

  getUser(): any {
    return this.userSubject.getValue(); // Obtiene el valor actual
  }

  async signInWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // Fuerza la selección de cuenta
    });
  
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result.user; // Devuelve el usuario autenticado
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      return null;
    }
  }


 async checkUserExists(uid: string): Promise<boolean> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.exists();
  }

  async registerUser(uid: string, userData: any): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const datosUsuario = {
      nombre: userData.nombre,
      telefono: userData.telefono,
      direccion: userData.direccion,
      cedula: userData.cedula,
      placa: userData.placa,
      stat: "Cliente"
    };
    await setDoc(userDocRef, datosUsuario);
  }

  async getRol(uid: string): Promise<string | null> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data['stat'] || null; // Devuelve el rol, o null si no está definido
    }
    return null;
  }

  logout() {
    return signOut(this.auth);
  }
  async getUserInfo(uid: string): Promise<any | null> {
    try {
      // Referencia al documento del usuario en Firestore
      const userDocRef = doc(this.firestore, `users/${uid}`);
      
      // Obtener el documento
      const userDoc = await getDoc(userDocRef);
      
      // Verificar si el documento existe y devolver sus datos
      if (userDoc.exists()) {
        return userDoc.data(); // Devolver los datos del usuario
      } else {
        return null; // Devolver null si el documento no existe
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      return null; // Devolver null en caso de error
    }
  }

  async getTarifas(): Promise<Record<string, any> | null> {
    try {
      // Referencia al documento específico en la colección "public"
      const docRef = doc(this.firestore, 'public/public');
      
      // Obtener el documento
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // Convertir el documento en un objeto y devolverlo
        return docSnap.data() as Record<string, any>;
      } else {
        console.warn('El documento no existe.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el documento público:', error);
      return null;
    }
  }


  async getHorarios():Promise<any[]>{
    try {
      // Referencia a la colección
      const collectionRef = collection(this.firestore, 'Horarios');
      
      // Obtener todos los documentos de la colección
      const querySnapshot = await getDocs(collectionRef);
      
      // Mapear los documentos a un arreglo de objetos
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,       // ID del documento
        ...doc.data()     // Datos del documento
      }));
  
      return documents; // Retorna todos los documentos como un arreglo
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      return []; // En caso de error, retornar un arreglo vacío
    }
  }
  async getArriendos():Promise<any[]>{
    try {
      // Referencia a la colección
      const collectionRef = collection(this.firestore, 'arriendos');
      
      // Obtener todos los documentos de la colección
      const querySnapshot = await getDocs(collectionRef);
      
      // Mapear los documentos a un arreglo de objetos
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,       // ID del documento
        ...doc.data()     // Datos del documento
      }));
  
      return documents; // Retorna todos los documentos como un arreglo
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      return []; // En caso de error, retornar un arreglo vacío
    }
  }
  async getUsers():Promise<any[]>{
    try {
      // Referencia a la colección
      const collectionRef = collection(this.firestore, 'users');
      
      // Obtener todos los documentos de la colección
      const querySnapshot = await getDocs(collectionRef);
      
      // Mapear los documentos a un arreglo de objetos
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,       // ID del documento
        ...doc.data()     // Datos del documento
      }));
  
      return documents; // Retorna todos los documentos como un arreglo
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      return []; // En caso de error, retornar un arreglo vacío
    }
  }

}
