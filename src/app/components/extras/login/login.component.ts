import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleAuthService} from '../../../services/google-auth.service';
import {  User } from '@angular/fire/auth';
import {FormsModule} from '@angular/forms'
import { ReadService } from '../../../services/read.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  
  isRegisterView: boolean = false;


  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";
  pass = "";
  confPass = "";

  errorMessage = "";

  private currentUser: User | null = null;

  constructor(private googleAuthService: GoogleAuthService , private read: ReadService) {}

  toggleView(): void {
    this.isRegisterView = !this.isRegisterView;
  }

  async logguear() {
    try {
      const user = await this.googleAuthService.signInWithGoogle();
      
      if (user != null) {
        this.currentUser = user;
        const userExists = await this.googleAuthService.checkUserExists(user.uid);
        
        if (userExists) {
          
          this.googleAuthService.router.navigate(['/cliente/principal']);
        } else {
          this.isRegisterView = true;
          this.nombre = user.displayName || '';
        }
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  }

    // Método para validar todos los campos
    validarCampos(): boolean {

      this.nombre = this.nombre.trim();
      this.telefono = this.telefono.trim();
      this.direccion = this.direccion.trim();
      this.cedula = this.cedula.trim();
      this.placa = this.placa.trim();
      this.pass = this.pass.trim();
      this.confPass = this.confPass.trim();


          
      if (this.nombre.length < 5) {
        this.errorMessage = "El nombre debe tener al menos 5 caracteres.";
        return false;
      }

      if (!/^\d{10}$/.test(this.telefono)) {
        this.errorMessage = "El teléfono debe tener exactamente 10 dígitos numéricos.";
        return false;
      }

      if (this.direccion.length < 5) {
        this.errorMessage = "La dirección debe tener al menos 5 caracteres.";
        return false;
      }

      if (!/^\d{10}$/.test(this.cedula)) {
        this.errorMessage = "La cédula debe tener exactamente 10 dígitos numéricos.";
        
        return false;
      }
      if (this.placa.length < 5) {
        this.errorMessage = "La placa no es valida.";
        return false;
      }

      if (this.pass.length < 5) {
        this.errorMessage = "La contraseña no es valida";
        return false;
      }

      if (this.pass !== this.confPass) {
        this.errorMessage = "Las contraseñas no coinciden.";
        return false;
      }

      this.errorMessage = "";
      return true;
    }

  async register() {
    if (this.currentUser && this.validarCampos()) {
      try {
        await this.googleAuthService.registerUser(this.currentUser.uid, {
          nombre: this.nombre,
          telefono: this.telefono,
          direccion: this.direccion,
          cedula: this.cedula,
          placa: this.placa,
          pass: this.pass,
        });
        console.log('Registro completado');
        this.googleAuthService.router.navigate(['/cliente/principal']);
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    } else {
      console.log(this.errorMessage);
      this.errorMessage = "";
    }
  }
}
