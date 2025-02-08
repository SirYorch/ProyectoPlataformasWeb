import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../admin/menu/menu.component';
import { UsuarioService } from '../../../services/usuario.service'; // 📌 Usar UsuarioService

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: {placa:string,nombre:string, telefono:string, tipo_usuario:string,uid:string}[] = [
    {
        placa: "ABC123",
        nombre: "Juan Pérez",
        telefono: "555-1234",
        tipo_usuario: "Cliente",
        uid: "1"
    },
    {
        placa: "XYZ789",
        nombre: "María Gómez",
        telefono: "555-5678",
        tipo_usuario: "Cliente",
        uid: "2"
    },
    {
        placa: "DEF456",
        nombre: "Carlos López",
        telefono: "555-8765",
        tipo_usuario: "Cliente",
        uid: "3"
    },
    {
        placa: "GHI789",
        nombre: "Ana Martínez",
        telefono: "555-4321",
        tipo_usuario: "Admin",
        uid: "4"
    }
];


  // <section class="seccion usuario" *ngFor="let usuario of usuarios">
  // <p>{{usuario.placa}}</p>
  // <p class="extra">{{usuario.nombre}}</p>
  // <p class="extra">{{usuario.telefono}}</p>
  // <p class="extra">{{usuario.tipo_usuario}}</p>
  // <button class="au button" (click)="verUsuario(usuario.uid)">Ver</button>

  user: any;
  tipo: Promise<string> | undefined;

    constructor(
      private usuarioService: UsuarioService,
      private router: Router,
      private userService: UserInfoService
    ) {}

  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 
    //eliminar lista predeterminada de usuarios, y tomar la lista de usuarios de la base de datos.

    // revisar el funcionamiento nuevo del boton ver de cada usuario para modificar los datos.

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

   
  verUsuario(uid: string) {
    this.userService.saveOtherUser(uid);
    this.router.navigate(['admin/perfilCliente']);
  }

  async eliminarUsuario(uid: string) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await this.usuarioService.eliminarUsuario(uid);
        this.usuarios = this.usuarios.filter(usuario => usuario.uid !== uid);
        console.log(` Usuario ${uid} eliminado de la lista.`);
      } catch (error) {
        console.error(" Error al eliminar usuario:", error);
      }
    }
  }
}
