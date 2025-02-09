import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { ParqueaderoComponent } from '../../extras/parqueadero/parqueadero.component';
import { PopUpsComponent } from "../../extras/pop-ups/pop-ups.component";
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";

@Component({
  selector: 'app-perfil-c',
  standalone: true,
  imports: [FormsModule, MenuComponent, ParqueaderoComponent, PopUpsComponent, ConfirmDialogsComponent],
  templateUrl: './perfil-c.component.html',
  styleUrl: './perfil-c.component.scss'
})
export class PerfilCComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private userService = inject(UserInfoService);

  user: any;
  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placas = "";
  stat = "";
  mensajeConfirmacion = ""; //  Para mostrar un mensaje al guardar cambios
  tipo: Promise<string> | undefined;
  otherUser: any;

  async ngOnInit(): Promise<void> {
    this.validarUsuario();



    try {
      //  Obtener datos del usuario desde PostgreSQL
      this.otherUser = this.userService.getOtherUser();
      const usuario = await this.usuarioService.obtenerUsuario(this.otherUser);;
      console.log("Usuario:", usuario);
      //  Cargar los datos en el formulario
      this.nombre = usuario.nombre;
      this.telefono = usuario.telefono;
      this.direccion = usuario.direccion;
      this.cedula = usuario.cedula;
      this.placas = usuario.placa;
      this.stat = usuario.tipo_usuario;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
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


     @ViewChild(PopUpsComponent) PopUpsComponent!: PopUpsComponent;
     @ViewChild(ConfirmDialogsComponent) ConfirmDialogsComponent!: ConfirmDialogsComponent;
     
   
     desplegarExito(){
       this.PopUpsComponent.desplegarSuccess("Se muestra un mensaje de exito");
     }
     desplegarError(){
       this.PopUpsComponent.desplegarError("Se meustra un mensaje de error");
     }
     desplegarConfirmacion(){
       this.ConfirmDialogsComponent.desplegarConfirmacion("Quiere enviar un cuadro de exito?", ()=>this.desplegarError());
     }

   async guardarInfo() {
    try {
      this.ConfirmDialogsComponent.desplegarConfirmacion("Esta seguro de querer actualizar la información?", async ()=>{
        await this.usuarioService.actualizarUsuario(this.otherUser, {
          nombre: this.nombre,
          telefono: this.telefono,
          direccion: this.direccion,
          cedula: this.cedula,
          placa: this.placas,
          tipo_usuario: this.stat
        });

        this.PopUpsComponent.desplegarSuccess("Los datos se han actualizado");

      });
      
    } catch (error) {
      this.PopUpsComponent.desplegarError("Error al actualizar los datos");
    }
  }
}
