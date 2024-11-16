import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-a',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil-a.component.html',
  styleUrl: './perfil-a.component.scss'
})
export class PerfilAComponent {
  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }


  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }

  
  user:any ;
  
  logout(){
    this.googleuser.logout();
    this.userService.clearUser();
    this.router.navigate([''])
  }

  nombre = "Usuario";
  telefono = "000000000";
  direccion = "Vivienda"
  cedula= "0000000000"
  placas= "AAA-0000"
  
  
  async ngOnInit(): Promise<void> {
    // Leer los datos del usuario desde el localStorage
    this.user = this.userService.getUser();
    
    if (!this.user) {
      // Redirigir al inicio de sesión si el usuario no está en localStorage
      this.router.navigate(['login']); // Redirigir en caso de error
      return; // Terminar la ejecución del método
    }
    
    try {
      // Verificar si el usuario existe en Firestore
      const userExists = await this.googleuser.checkUserExists(this.user.uid);



      if (!userExists) {
        
      this.router.navigate(['login']); // Redirigir en caso de error
        return; // Terminar la ejecución del método
      }
      
      // Obtener la información del usuario
      const usuario = await this.googleuser.getUserInfo(this.user.uid);
      if (!usuario || usuario.stat !== 'Admin') {
        // Redirigir al inicio si el estado del usuario no es 'Cliente'
        
      this.router.navigate(['']); // Redirigir en caso de error
      }else{
        this.nombre = usuario.nombre;
        this.telefono = usuario.telefono;
        this.direccion = usuario.direccion;
        this.cedula = usuario.cedula
        this.placas = usuario.placa

      }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
    }
  }

  async guardarInfo(){
    await this.googleuser.registerUser(this.user.uid,{
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      cedula: this.cedula,
      placa: this.placas,
    }) 
  }

}
