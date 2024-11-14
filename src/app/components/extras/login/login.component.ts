import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  isRegisterView: boolean = false;

  // Método para alternar la vista
  toggleView(): void {
    this.isRegisterView = !this.isRegisterView;
  }

  constructor(private googleAuthService: GoogleAuthService) {}


  logguear() {
    this.googleAuthService.signInWithGoogle()
      .then(result => {
        console.log("Inicio de sesión exitoso", result);
      })
      .catch(error => {
        console.error("Error en el inicio de sesión:", error);
      });
  }
  
}
