import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegisterView: boolean = false;

  // Método para alternar la vista
  toggleView(): void {
    this.isRegisterView = !this.isRegisterView;
  }

}
