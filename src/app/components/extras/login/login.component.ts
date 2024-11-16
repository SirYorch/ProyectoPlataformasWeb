import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleAuthService} from '../../../services/google-auth.service';
import {  User } from '@angular/fire/auth';
import {FormsModule} from '@angular/forms'
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  
  isRegisterView: boolean = false;


  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";

  errorMessage = "";

  private currentUser: User | null = null;

  user:any = null;

  constructor(private googleAuthService: GoogleAuthService , private router:Router,private userService:UserInfoService) {}
  async ngOnInit(): Promise<void> {
    // Leer los datos del usuario desde el localStorage
    this.user = this.userService.getUser();
    
    if (!this.user) {
      return; // Terminar la ejecución del método
    }
    
    try {
      // Verificar si el usuario existe en Firestore
      const userExists = await this.googleAuthService.checkUserExists(this.user.uid);
      if (!userExists) {
        return; // Terminar la ejecución del método
      }
      
      // Obtener la información del usuario
      const usuario = await this.googleAuthService.getUserInfo(this.user.uid);
      if (!usuario || usuario.stat !== 'Admin') {
        // Redirigir al inicio si el estado del usuario no es 'Cliente'
        this.router.navigate(['/cliente/principal']);
      }else{
        this.router.navigate(['/admin/principal']);
      }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
      this.router.navigate(['']); // Redirigir en caso de error
    }
  }

  toggleView(): void {
    this.isRegisterView = !this.isRegisterView;

  }

  logout(){
    this.googleAuthService.logout();
    this.isRegisterView = false;
  }

  async logguear() {
    this.googleAuthService.signInWithGoogle().then(async (user) => {
      if(user!= null){
        const userExists = await this.googleAuthService.checkUserExists(user.uid);
        this.currentUser = user;
        if (userExists) {
          const role = await this.googleAuthService.getRol(user.uid);
          console.log(role)
          this.userService.saveUser({
            uid: user.uid,
          });
          if (role === 'Admin') {
            this.router.navigate(['/admin/principal']);
          } else if (role === 'Cliente') {
            this.router.navigate(['/cliente/principal']);
          } else {
            console.error('Rol no reconocido');
          }
        } else {
          // Mostrar vista de registro
          this.isRegisterView = true;
        }
      }
    }).catch((error) => {
      console.error('Error en inicio de sesión:', error);
    });
  }

    // Método para validar todos los campos
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
        });
        console.log('Registro completado');
        this.userService.saveUser({
          uid: this.currentUser.uid,
        });
        this.googleAuthService.router.navigate(['/cliente/principal']);
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    } else {
      console.log(this.errorMessage); // Esto luego debemos crearlo como una venana emergente
      this.errorMessage = "";
    }
  }

  
}
