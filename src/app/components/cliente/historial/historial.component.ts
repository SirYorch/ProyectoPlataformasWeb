import { Component } from '@angular/core';
import { MenuComponent } from "../../admin/menu/menu.component";
import { MenuCComponent } from "../menu-c/menu-c.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MenuComponent, MenuCComponent, CommonModule, FormsModule ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  user: any;
  tipo: Promise<string> | undefined;
  constructor(
    private router: Router,
    private userService: UserInfoService,
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 
    //eliminar tickets predeterminado y traer tickets de la base de datos  (la solicitud get del usuario)

   }
 
   validarUsuario(){
 
     this.user = this.userService.getUser();
     this.tipo = this.userService.validarUsuario(this.user).then(tipo => tipo ?? "ERROR");
     this.tipo?.then(tipoUsuario => {
       switch (tipoUsuario) {
       case 'ADMIN':
         break;
       case 'CLIENTE':
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

   tickets: {usuario:{
    uid:string,
    nombre:string,
    telefono:string,
    direccion:string,
    cedula:string,
    placa:string,
  }, fechaInicio:Date ,fechaFin:Date, precio: number}[] = [
    {
      usuario: {
        uid: "UID12345",
        nombre: "Juan Pérez",
        telefono: "0987654321",
        direccion: "Av. Siempre Viva 123",
        cedula: "1723456789",
        placa: "ABC-1234",
      },
      fechaInicio: new Date("2025-02-07T08:00:00"),
      fechaFin: new Date("2025-02-07T10:00:00"),
      precio: 5.00,
    },
    {
      usuario: {
        uid: "UID67890",
        nombre: "María González",
        telefono: "0998765432",
        direccion: "Calle Los Pinos 456",
        cedula: "1729876543",
        placa: "XYZ-5678",
      },
      fechaInicio: new Date("2025-02-07T14:00:00"),
      fechaFin: new Date("2025-02-07T16:30:00"),
      precio: 7.50,
    }
  ];

  
}
