import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { TarifaService } from '../../../services/tarifa.service'; // 📌 Servicio para obtener tarifas
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-a',
  standalone: true,
  imports: [MenuComponent, ParqueaderoComponent, CommonModule],
  templateUrl: './main-a.component.html',
  styleUrl: './main-a.component.scss'
})
export class MainAComponent implements OnInit {
  user: any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Día";
  
  // Ahora las tarifas se manejarán en un array
  tarifas: any[] = [{
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
}]; //valores predeterminados, se deberan borrar cuando se tomen los nuevos.
  tipo: Promise<string> | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private tarifaService: TarifaService,
    private router: Router,
    private userService: UserInfoService
  ) {}

  
  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 
    //tomar el nombre del usuario.

    //tomar el motd

    //tomar el horario del parqueadero para ver si esta activo o no.
 
    //tomar las tarifas, eliminar las tarifas predeterminadas
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
}
