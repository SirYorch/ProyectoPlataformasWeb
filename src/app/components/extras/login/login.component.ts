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
  isRegisterView: boolean = false; // Indica si se debe mostrar el formulario de registro
  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";
  errorMessage = "";
  user: any = null;
  currentUser: any = null;

  constructor(private googleAuthService: GoogleAuthService, private router: Router, private userService: UserInfoService) {}

  //  Cambia entre vista de inicio de sesión y registro
  toggleView(): void {
    this.isRegisterView = !this.isRegisterView;
  }

  //  Verifica si hay un usuario autenticado en PostgreSQL
  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();

    if (!this.user) return;

    try {
      console.log(" Verificando existencia del usuario en PostgreSQL...");
      const userExists = await this.googleAuthService.checkUserExists(this.user.uid);

      if (userExists) {
        const tipoUsuario = await this.googleAuthService.getTipoUsuario(this.user.uid);
        this.userService.saveUser({ uid: this.user.uid });

        if (tipoUsuario === 'ADMIN') {
          console.log(" Usuario ADMIN detectado. Redirigiendo...");
          this.router.navigate(['/admin/principal']);
        } else if (tipoUsuario === 'CLIENTE') {
          console.log(" Usuario CLIENTE detectado. Redirigiendo...");
          this.router.navigate(['/cliente/principal']);
        }
      }
    } catch (error) {
      console.error(' Error durante la validación del usuario:', error);
    }
  }

  //  Inicia sesión con Google y consulta PostgreSQL
  async logguear() {
    try {
      const result = await this.googleAuthService.signInWithGoogle();

      if (result) {
        this.currentUser = result.user;
        console.log(" Usuario autenticado con Google:", this.currentUser);

        // Verificar existencia en PostgreSQL
        const userExists = await this.googleAuthService.checkUserExists(this.currentUser.uid);

        if (!userExists) {
          console.log(" Usuario no encontrado en PostgreSQL. Mostrando formulario de registro...");
          this.isRegisterView = true;
          return;
        }

        //  Obtener tipo de usuario desde PostgreSQL
        const tipoUsuario = await this.googleAuthService.getTipoUsuario(this.currentUser.uid);
        
        if (!tipoUsuario) {
          console.log(" No se pudo obtener el tipo de usuario. Redirigiendo a login.");
          this.router.navigate(['/login']);
          return;
        }

        this.userService.saveUser({ uid: this.currentUser.uid });

        // Redirigir según el tipo de usuario
        if (tipoUsuario === 'ADMIN') {
          console.log("Redirigiendo a Administrador...");
          this.router.navigate(['/admin/principal']);
        } else if (tipoUsuario === 'CLIENTE') {
          console.log(" Redirigiendo a Cliente...");
          this.router.navigate(['/cliente/principal']);
        } else {
          console.log("⚠️ Tipo de usuario desconocido. Redirigiendo a login.");
          this.router.navigate(['/login']);
        }
      } else {
        console.log(" No se pudo autenticar con Google.");
      }
    } catch (error) {
      console.error(" Error durante el inicio de sesión:", error);
    }
  }

  // Registra al usuario en PostgreSQL y lo redirige
  async register() {
    if (this.currentUser && this.validarCampos()) {
      try {
        console.log(" Registrando usuario en PostgreSQL...");
        
        await this.googleAuthService.registerUser(this.currentUser.uid, {
          nombre: this.nombre,
          telefono: this.telefono,
          direccion: this.direccion,
          cedula: this.cedula,
          placa: this.placa,
          tipo_usuario: "CLIENTE"
        });

        // Verificar usuario en PostgreSQL antes de redirigir
        const usuario = await this.googleAuthService.getUserInfo(this.currentUser.uid);
        
        if (usuario && usuario.tipo_usuario === "CLIENTE") {
          console.log(" Registro exitoso. Redirigiendo a cliente/principal...");
          this.userService.saveUser({ uid: this.currentUser.uid });
          this.router.navigate(['/cliente/principal']);
        } else {
          console.log(" No se pudo validar el usuario en la base de datos. Redirigiendo a login...");
          this.router.navigate(['/login']);
        }

      } catch (error) {
        console.error(" Error al registrar usuario:", error);
      }
    }
  }

  //  Valida que los campos sean correctos antes de registrar
  validarCampos(): boolean {
    this.nombre = this.nombre.trim();
    this.telefono = this.telefono.trim();
    this.direccion = this.direccion.trim();
    this.cedula = this.cedula.trim();
    this.placa = this.placa.trim();

    if (this.nombre.length < 5) {
      this.errorMessage = "⚠️ El nombre debe tener al menos 5 caracteres.";
      return false;
    }
    if (!/^\d{10}$/.test(this.telefono)) {
      this.errorMessage = "⚠️ El teléfono debe tener 10 dígitos numéricos.";
      return false;
    }
    if (this.direccion.length < 5) {
      this.errorMessage = "⚠️ La dirección debe tener al menos 5 caracteres.";
      return false;
    }
    if (!/^\d{10}$/.test(this.cedula)) {
      this.errorMessage = "⚠️ La cédula debe tener 10 dígitos numéricos.";
      return false;
    }
    if (this.placa.length < 5) {
      this.errorMessage = "⚠️ La placa no es válida.";
      return false;
    }

    this.errorMessage = "";
    return true;
  }

  // Cierra sesión
  logout() {
    this.googleAuthService.logout();
    this.isRegisterView = false;
  }
}
