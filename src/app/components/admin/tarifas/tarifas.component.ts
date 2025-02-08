import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { TarifaService } from '../../../services/tarifa.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../../services/user-info.service';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule, MenuComponent, CommonModule],
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})
export class TarifasComponent {
  user: any;
  tipo: Promise<string> | undefined;
desplegarCrearTarifa() {
  this.crear.nativeElement.classList.toggle("desplegarCrear");
}
desplegarEditar(arg0: null) {
throw new Error('Method not implemented.');
}
Descripcion: any;
Precio: any;
guardarEditar() {
throw new Error('Method not implemented.');
}
CrearTarifa() {
throw new Error('Method not implemented.');
}
@ViewChild('crear') crear!: ElementRef;

constructor(
  private googleuser: GoogleAuthService,
  private read: ReadService,
  private router: Router,
  private userService: UserInfoService,
  private usuarioService: UsuarioService,
  private tarifaService: TarifaService
) {}
    
  motd = "Mensaje del dia";
  tarifas: {descripcion:string , precio:number}[] = [{
    descripcion: "Tarifa básica",
    precio: 10.50
},
{
    descripcion: "Tarifa estándar",
    precio: 15.75
},
{
    descripcion: "Tarifa premium",
    precio: 25.00
}];

  
  guardarDatos(){
    this.googleuser.saveTarifas(
      {
        motd:this.motd
      }
    );
  }


  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 
    //eliminar las tarifas predeterminadas y tomar las tarifas de la base de datos.

    //metodo para poder crear tarifas.

    //metodo para poder editar tarifas.

    //objeto publico en el back para poder utilizar la elctura de horario entrada y salida rpedeterminado y el motd.

    //leer el motd 

    //actualizar el motd

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
