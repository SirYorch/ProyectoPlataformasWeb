import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth'; // Importa Auth

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  constructor(private auth: Auth) {} // Inyecta Auth aquí

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
}
