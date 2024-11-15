import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc ,setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ReadService } from './read.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private firestore = inject(Firestore);
  public router = inject(Router);
  private auth = inject(Auth);
  
  // Observable para los datos del usuario
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {}

  setUser(data: any): void {
    this.userSubject.next(data); // Actualiza el usuario
  }

  getUser(): any {
    return this.userSubject.getValue(); // Obtiene el valor actual
  }

  async signInWithGoogle(): Promise<User | null> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    const user = credential.user;

    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.exists() ? userSnapshot.data() : null;

      if (userData) {
        this.setUser(userData); // Actualiza el BehaviorSubject
      }

      return user;
    }

    return null;
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
      pass: userData.pass,
      stat: "Cliente"
    };
    await setDoc(userDocRef, datosUsuario);
    console.log('Usuario registrado exitosamente');
    this.setUser(datosUsuario); // Actualiza el BehaviorSubject
  }


}
