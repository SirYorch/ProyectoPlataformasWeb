import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  user: any;
  tipo: Promise<string> | undefined;

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

  async ngOnInit(): Promise<void> {
    this.validarUsuario();
    
    //acutalizar java para trabajar con fechas y no con Timestamps
    
    //actualizar el funcionamiento en fecha y hora a la vez

    //eliminar el array de tickets y traer los tickets de la base de datos

    //preguntarle a don timbi como quiere que funcione el dia,semana y mes.

    
  }
  

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private userService: UserInfoService
  ) {}

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
