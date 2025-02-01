import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRegisterView: boolean = false;
  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";
  errorMessage = "";
  user: any = null;
  currentUser: any = null;

  constructor(private googleAuthService: GoogleAuthService, private router: Router, private userService: UserInfoService) {}
  toggleView(): void {  // ✅ DEFINIDO
    this.isRegisterView = !this.isRegisterView;
  }
  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();

    if (!this.user) return;

    try {
      const userExists = await this.googleAuthService.checkUserExists(this.user.uid);
      if (userExists) {
        const tipoUsuario = await this.googleAuthService.getTipoUsuario(this.user.uid);
        this.userService.saveUser({ uid: this.user.uid });

        if (tipoUsuario === 'ADMIN') {
          this.router.navigate(['/admin/principal']);
        } else if (tipoUsuario === 'CLIENTE') {
          this.router.navigate(['/cliente/principal']);
        }
      }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
    }
  }

  async logguear() {
    const result = await this.googleAuthService.signInWithGoogle();
    if (result) {
      this.currentUser = result.user;
      if (result.isNewUser) {
        this.isRegisterView = true;
      } else {
        const tipoUsuario = await this.googleAuthService.getTipoUsuario(this.currentUser.uid);
        this.userService.saveUser({ uid: this.currentUser.uid });

        if (tipoUsuario === 'ADMIN') {
          this.router.navigate(['/admin/principal']);
        } else {
          this.router.navigate(['/cliente/principal']);
        }
      }
    }
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
          tipo_usuario: "CLIENTE"
        });
        

        this.userService.saveUser({ uid: this.currentUser.uid });
        this.router.navigate(['/cliente/principal']);
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    }
  }

  validarCampos(): boolean {
    this.nombre = this.nombre.trim();
    this.telefono = this.telefono.trim();
    this.direccion = this.direccion.trim();
    this.cedula = this.cedula.trim();
    this.placa = this.placa.trim();

    if (this.nombre.length < 5) {
      this.errorMessage = "El nombre debe tener al menos 5 caracteres.";
      return false;
    }
    if (!/^\d{10}$/.test(this.telefono)) {
      this.errorMessage = "El teléfono debe tener 10 dígitos numéricos.";
      return false;
    }
    if (this.direccion.length < 5) {
      this.errorMessage = "La dirección debe tener al menos 5 caracteres.";
      return false;
    }
    if (!/^\d{10}$/.test(this.cedula)) {
      this.errorMessage = "La cédula debe tener 10 dígitos numéricos.";
      return false;
    }
    if (this.placa.length < 5) {
      this.errorMessage = "La placa no es válida.";
      return false;
    }

    this.errorMessage = "";
    return true;
  }

  logout() {
    this.googleAuthService.logout();
    this.isRegisterView = false;
  }
}
