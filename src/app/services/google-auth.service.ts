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
  async SaveUser(uid: string, userData: any): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const datosUsuario = {
      nombre: userData.nombre,
      telefono: userData.telefono,
      direccion: userData.direccion,
      cedula: userData.cedula,
      placa: userData.placa,
      stat: userData.stat
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

  async saveTarifas(userData: any) {
    const userDocRef = doc(this.firestore, `public/public`);
    const datotarifas = {
      motd:userData.motd,
      parqueaderoEstado: userData.parqueaderoEstado,
      plazasDisponibles:userData.plazasDisponibles,
      tarifas1:userData.tarifas1,
      tarifas2:userData.tarifas2,
      tarifas3:userData.tarifas3,
      tarifas4:userData.tarifas4,
      tarifas5:userData.tarifas5,
      tarifas6:userData.tarifas6,
      tarifas7:userData.tarifas7,
      tarifas8:userData.tarifas8,
    };
    await setDoc(userDocRef, datotarifas);
  }

  async getEspacio(): Promise<Record<string, any> | null> {
    try {
      // Referencia al documento específico en la colección "public"
      const docRef = doc(this.firestore, 'espacio/lugar1');
      
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
      console.error('Error al obtener el documento de espacios:', error);
      return null;
    }
  }

  

  async saveEspacio(userData: any) {
    const userDocRef = doc(this.firestore, `espacio/lugar1`);
    const datotarifas = {
      ocupados:userData.ocupados,
      reservados:userData.reservados,
      totales:userData.totales,
      dia:userData.dia,
    };
    await setDoc(userDocRef, datotarifas);
  }
  



  async saveGeneral(userData: any) {
    try {
      // Referencia al documento en la colección "public/horario"
      const docRef = doc(this.firestore, 'public/horario');
      
      // Estructurar los datos con los nombres de campos requeridos
      const horarioData = {
        entrada1: userData.entrada1,
        entrada2: userData.entrada2,
        salida1: userData.salida1,
        salida2: userData.salida2,
      };
  
      // Guardar los datos en Firestore
      await setDoc(docRef, horarioData);
      console.log('Datos guardados correctamente en public/horario');
    } catch (error) {
      console.error('Error al guardar los datos en public/horario:', error);
    }
  }



  async getGeneral(): Promise<Record<string, any> | null> {
    try {
      // Referencia al documento específico en la colección "public"
      const docRef = doc(this.firestore, 'public/horario');
      
      // Obtener el documento
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // Obtener los datos del documento
        const data = docSnap.data() as Record<string, any>;
  
        // Procesar las entradas y salidas
        return {
          entrada1: this.formatTimeWithAmPm(this.extractDateTime(data['entrada1'])),
          entrada2: this.formatTimeWithAmPm(this.extractDateTime(data['entrada2'])),
          salida1: this.formatTimeWithAmPm(this.extractDateTime(data['salida1'])),
          salida2: this.formatTimeWithAmPm(this.extractDateTime(data['salida2'])),
        };
      } else {
        console.warn('El documento no existe.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el documento público:', error);
      return null;
    }
  }
  async getHorarios(): Promise<any[]> {
    try {
      // Referencia a la colección
      const collectionRef = collection(this.firestore, 'horarios');
  
      // Obtener todos los documentos de la colección
      const querySnapshot = await getDocs(collectionRef);
  
      // Obtener datos generales
      const generalData = await this.getGeneral();
  
      // Validar que los datos generales existen
      if (!generalData) {
        console.warn("No se pudieron obtener los datos generales.");
        return [];
      }
  
      // Mapear y modificar los documentos
      const documents: any[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
  
        // Formatear fechaInicio y fechaFin
        const fechaInicio = this.formatTimeWithAmPm(this.extractDateTime(data['fechaInicio']));
        const fechaFin = this.formatTimeWithAmPm(this.extractDateTime(data['fechaFin']));
  
        // Crear la estructura del documento modificado
        return {
          id: doc.id, // ID del documento
          nombre: data['nombre'] || `Horario-${doc.id}`, // Nombre o un nombre predeterminado
          fechaInicio: `${fechaInicio.hora}:${fechaInicio.minutos} ${fechaInicio.ampm}`, // Hora formateada
          fechaFin: `${fechaFin.hora}:${fechaFin.minutos} ${fechaFin.ampm}`, // Hora formateada
          // Puedes agregar más propiedades del documento si las necesitas
        };
      });
  
      return documents; // Retorna los documentos modificados como un arreglo
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      return []; // En caso de error, retornar un arreglo vacío
    }
  }
  // Función para formatear un timestamp con AM/PM
  formatTimeWithAmPm(timestamp: { hora: number; minutos: number }): { hora: string; minutos: string; ampm: string } {
    let { hora, minutos } = timestamp;
    const period = hora >= 12 ? 'PM' : 'AM';
  
    // Ajustar la hora al formato de 12 horas
    hora = hora % 12 || 12; // Convierte 0 o 12 a 12 en formato de 12 horas
    const horaStr = hora.toString().padStart(2, '0'); // Asegura que sea de dos dígitos
    const minutosStr = minutos.toString().padStart(2, '0'); // Asegura que sea de dos dígitos
  
    return { hora: horaStr, minutos: minutosStr, ampm: period };
  }
  
  // Método para extraer fecha, hora y minutos de un timestamp
  private extractDateTime(timestamp: any): { fecha: string, hora: number, minutos: number } {
    if (!timestamp || !timestamp.toDate) {
      return { fecha: '', hora: 0, minutos: 0 }; // Devuelve valores vacíos o predeterminados si no es válido
    }
    const date = timestamp.toDate(); // Convierte el timestamp a un objeto Date
    return {
      fecha: date.toISOString().split('T')[0], // Extrae la fecha en formato 'YYYY-MM-DD'
      hora: date.getHours(), // Obtiene la hora
      minutos: date.getMinutes() // Obtiene los minutos
    };
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
