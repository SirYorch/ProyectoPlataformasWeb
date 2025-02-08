import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { PopUpsComponent } from "../../extras/pop-ups/pop-ups.component";
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";

@Component({
  selector: 'app-perfil-a',
  standalone: true,
  imports: [FormsModule, MenuComponent, PopUpsComponent, ConfirmDialogsComponent],
  templateUrl: './perfil-a.component.html',
  styleUrl: './perfil-a.component.scss'
})
export class PerfilAComponent implements OnInit {
  user: any;
  nombre = "Usuario";
  telefono = "000000000";
  direccion = "Vivienda";
  cedula = "0000000000";
  placas = "AAA-0000";
  stat = "CLIENTE"; 
  tipo: Promise<string> | undefined;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private userService: UserInfoService
  ) {}
  async ngOnInit(): Promise<void> {
    this.validarUsuario();

    //asignacion de espacio desde el backend.

    //eliminar valores predeterminados de reservas y cargar las reservas desde el backend.

    //agregar funcionalidad de VER reserva (despliega una ventana de parqueadero, mostrando donde esta ubicado el lugar)

    //agregar funcionalidad de ELIMINAR reserva

    
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

  async guardarInfo() {
    try {
      await this.usuarioService.actualizarUsuario(this.user.uid, {
        nombre: this.nombre,
        telefono: this.telefono,
        direccion: this.direccion,
        cedula: this.cedula,
        placa: this.placas,
        tipo_usuario: this.stat //  Asegurar que se envía
      });
  
      console.log("Usuario actualizado en PostgreSQL");
    } catch (error) {
      alert("Error al actualizar información");
    }
  }
  
}
