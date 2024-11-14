import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  // Método de inicio de sesión con Google
  SignInWithPopup() {
  }
}
