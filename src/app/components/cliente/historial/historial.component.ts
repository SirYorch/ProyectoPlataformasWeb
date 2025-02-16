import { Component } from '@angular/core';
import { MenuComponent } from "../../admin/menu/menu.component";
import { MenuCComponent } from "../menu-c/menu-c.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TicketService } from '../../../services/ticket.service';
import { tick } from '@angular/core/testing';

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
  usuario: any;
  constructor(
    private router: Router,
    private userService: UserInfoService,
    private usuarioService: UsuarioService,
    private ticketsService: TicketService
  ) {}

  async ngOnInit(): Promise<void> {
    this.validarUsuario();
    this.usuario = await this.usuarioService.obtenerUsuario(this.user.uid)
    //eliminar tickets predeterminado y traer tickets de la base de datos  (la solicitud get del usuario)
    this.tickets = await this.ticketsService.obtenerTicketsUsuario(this.usuario.uid)
    console.log(this.tickets)

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

   tickets:any = [
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
    }
  ];

  
}
