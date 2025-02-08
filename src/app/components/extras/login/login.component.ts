import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopUpsComponent } from "../pop-ups/pop-ups.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PopUpsComponent],
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
  tipo: Promise<string | void> = Promise.resolve();
  valido: boolean = true;

  constructor(private googleAuthService: GoogleAuthService, private router: Router, private userService: UserInfoService) {}


  @ViewChild(PopUpsComponent) PopUpsComponent!: PopUpsComponent;
  

  desplegarExito(mensaje:string){
    this.PopUpsComponent.desplegarSuccess(mensaje);
  }
  desplegarError(mensaje:string){
    this.PopUpsComponent.desplegarError(mensaje);
  }
  //  Cambia entre vista de inicio de sesión y registro
  toggleView(): void {
    this.isRegisterView = !this.isRegisterView;
  }

  //  Verifica si hay un usuario autenticado en PostgreSQL
  async ngOnInit(): Promise<void> {
   this.validarUsuario();


   ///mostrar mensaje de usuario detectado antes de cada uno de los redireccionamientos
  }

  validarUsuario(){

    this.user = this.userService.getUser();
    this.tipo = this.userService.validarUsuario(this.user).then(tipo => tipo ?? "ERROR");
    this.tipo?.then(tipoUsuario => {
      switch (tipoUsuario) {
      case 'ADMIN':
        this.router.navigate(['admin/principal']);
        break;
      case 'CLIENTE':
        this.router.navigate(['cliente/principal']);
        break;
      case 'ERROR':
      default:
        console.log("⚠️ Tipo de usuario desconocido o error. Redirigiendo a login.");
        this.router.navigate(['/login']);
        break;
      }
    }).catch(error => {
      console.error("Error al validar el usuario:", error);
      this.router.navigate(['/login']);
    });
  }

  //  Inicia sesión con Google y consulta PostgreSQL
  async logguear() {
    try {
      const result = await this.googleAuthService.signInWithGoogle();

      if (result) {
        this.currentUser = result.user;

        // Verificar existencia en PostgreSQL
        const userExists = await this.googleAuthService.checkUserExists(this.currentUser.uid);

        if (!userExists) {
          this.isRegisterView = true;
          return;
        }

        //  Obtener tipo de usuario desde PostgreSQL
        const tipoUsuario = await this.googleAuthService.getTipoUsuario(this.currentUser.uid);
        
        if (!tipoUsuario) {
          this.router.navigate(['/login']);
          return;
        }

        this.userService.saveUser({ uid: this.currentUser.uid });

        // Redirigir según el tipo de usuario

        if (tipoUsuario === 'ADMIN') {
          this.router.navigate(['/admin/principal']);
        } else if (tipoUsuario === 'CLIENTE') {
          this.router.navigate(['/cliente/principal']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
      }
    } catch (error) {
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
          this.desplegarExito(" Registro exitoso. Redirigiendo a cliente/principal...");
          this.userService.saveUser({ uid: this.currentUser.uid });
          setTimeout(()=>{this.router.navigate(['/cliente/principal'])},1000);
        } else {
          this.desplegarError(" No se pudo validar el usuario en la base de datos. Redirigiendo a login...");
          setTimeout(()=>{this.router.navigate(['/login'])},1000);
        }

      } catch (error) {
        this.desplegarError(`Error al registrar usuario: ${(error as any).message}`);
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
      this.errorMessage = "El nombre debe tener al menos 5 caracteres.";
      this.valido = false;
    }
    if (!/^\d{10}$/.test(this.telefono)) {
      this.errorMessage = "El teléfono debe tener 10 dígitos numéricos.";
      this.valido = false;
    }
    if (this.direccion.length < 5) {
      this.errorMessage = "La dirección debe tener al menos 5 caracteres.";
      this.valido = false;
    }
    if (!/^\d{10}$/.test(this.cedula)) {
      this.errorMessage = "La cédula debe tener 10 dígitos numéricos.";
      this.valido = false;
    }
    if (this.placa.length < 5) {
      this.errorMessage = "La placa no es válida.";
      this.valido = false;
    }

    if(!this.valido){
      this.desplegarError(this.errorMessage);
      return false;
    }
    
    return true;
  }

  // Cierra sesión
  logout() {
    this.googleAuthService.logout();
    this.isRegisterView = false;
  }
}
