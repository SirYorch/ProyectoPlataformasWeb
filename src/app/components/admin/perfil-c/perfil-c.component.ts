import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";



@Component({
  selector: 'app-perfil-c',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './perfil-c.component.html',
  styleUrl: './perfil-c.component.scss'
})
export class PerfilCComponent {

  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }

  
  user:any ;

  nombre = "Usuario";
  telefono = "000000000";
  direccion = "Vivienda"
  cedula= "0000000000"
  placas= "AAA-0000"
  
  stat= "Cliente"
  
  
  async ngOnInit(): Promise<void> {
    // Leer los datos del usuario desde el localStorage
    this.user = this.userService.getOtherUser();
    const userA = this.userService.getUser();
    console.log(this.user)
    
    if (!this.user) {
      // Redirigir al inicio de sesión si el usuario no está en localStorage
      this.router.navigate(['login']); // Redirigir en caso de error
      return; // Terminar la ejecución del método
    }
    
    try {
      // Verificar si el usuario existe en Firestore
      const userExists = await this.googleuser.checkUserExists(this.user);
      


        if (!userExists) {
          
          this.router.navigate(['admin/usuarios']); // Redirigir en caso de error
            return; // Terminar la ejecución del método
        }
        
        
        // Obtener la información del usuario
        const usuario = await this.googleuser.getUserInfo(this.user);
        const usuarioA = await this.googleuser.getUserInfo(userA.uid);
        if (!usuario || usuarioA.stat !== 'Admin') {          
        this.router.navigate(['']); // Redirigir en caso de error
        }else{
          this.nombre = usuario.nombre;
          this.telefono = usuario.telefono;
          this.direccion = usuario.direccion;
          this.cedula = usuario.cedula
          this.placas = usuario.placa
          this.stat = usuario.stat
        }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
    }
  }

  async guardarInfo(){
    await this.googleuser.actualizarUsuario(this.user,{
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      cedula: this.cedula,
      placa: this.placas,
      stat: this.stat
    }) 
  }

}
