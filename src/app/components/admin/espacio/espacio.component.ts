import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";

@Component({
  selector: 'app-espacio',
  standalone: true,
  imports: [FormsModule, MenuComponent, ParqueaderoComponent],
  templateUrl: './espacio.component.html',
  styleUrl: './espacio.component.scss'
})
export class EspacioComponent {
  tipo: Promise<string> | undefined;

  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }
  
  filas =0;
  columnas =0;
  

  user:any;

  guardarDatos(){
    


  }
  
    async ngOnInit(): Promise<void> {
      this.validarUsuario();
   
      
      //guardar datos de filas y columnas en el back

      //modificar el guardar filas y columnas para que se eliminen todas y se inserten de nuevo las que se deban crear.
  
      //actualizar el componente para poder ver los cambios del parqueadero.
  
     }
   
     validarUsuario(){
   
       this.user = this.userService.getUser();
       this.tipo = this.userService.validarUsuario(this.user).then(tipo => tipo ?? "ERROR");
       this.tipo?.then(tipoUsuario => {
         switch (tipoUsuario) {
         case 'ADMIN':
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
  
}
