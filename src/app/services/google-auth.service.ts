import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc ,setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private firestore = inject(Firestore);
  public router = inject(Router);
  private auth = inject(Auth); // Inyecta Auth correctamente

  constructor() {} // Inyecta Auth aquí


  async signInWithGoogle(): Promise<User | null> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    const user = credential.user;

    if (user) {
      return user;
    }
    return null;
  }

  async checkUserExists(uid: string): Promise<boolean> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.exists();
  }

  async registerUser(uid: string, userData: { nombre: string; telefono: string; direccion: string; cedula: string; placa: string; pass: string }): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const datosUsuario = {nombre: userData.nombre, telefono: userData.telefono, direccion: userData.direccion, cedula: userData.cedula, placa: userData.placa, pass: userData.pass, stat: "Cliente"};
    await setDoc(userDocRef, datosUsuario);
    console.log('Usuario registrado exitosamente');
  }


}
