import { Component, OnInit, ViewChild } from '@angular/core';
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

    
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private userService: UserInfoService
  ) {}
  async ngOnInit(): Promise<void> {
    this.validarUsuario();

    try {
      //  Obtener datos del usuario desde PostgreSQL
      const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);;
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
      this.router.navigate(['login']);
    }
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
      this.ConfirmDialogsComponent.desplegarConfirmacion("Esta seguro de querer actualizar la información?", async ()=>{
        await this.usuarioService.actualizarUsuario(this.user.uid, {
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
