import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { UserInfoService } from '../../../services/user-info.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [MenuComponent,CommonModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {
  user: any;
  tipo: Promise<string> | undefined;


  reservas: {usuario:{
    uid:string,
    nombre:string,
    telefono:string,
    direccion:string,
    cedula:string,
    placa:string,
  },id:number, inicio:Date ,}[] = [
    {
      usuario: {
        uid: "UID12345",
        nombre: "Juan Pérez",
        telefono: "0987654321",
        direccion: "Av. Siempre Viva 123",
        cedula: "1723456789",
        placa: "ABC-1234",
      },
      id: 1,
      inicio: new Date("2025-02-07T08:00:00"),
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
      id: 2,
      inicio: new Date("2025-02-07T10:30:00"),
    },
    {
      usuario: {
        uid: "UID54321",
        nombre: "Carlos Ramírez",
        telefono: "0976543210",
        direccion: "Av. La Prensa 789",
        cedula: "1721122334",
        placa: "DEF-9012",
      },
      id: 3,
      inicio: new Date("2025-02-07T14:45:00"),
    }
  ];

  async ngOnInit(): Promise<void> {
    this.validarUsuario();

    //asignacion de espacio desde el backend.

    //eliminar valores predeterminados de reservas y cargar las reservas desde el backend.

    //agregar funcionalidad de VER reserva (despliega una ventana de parqueadero, mostrando donde esta ubicado el lugar)

    //agregar funcionalidad de ELIMINAR reserva

    
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
