import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuCComponent } from "../menu-c/menu-c.component";
import { PopUpsComponent } from "../../extras/pop-ups/pop-ups.component";
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuCComponent, PopUpsComponent, ConfirmDialogsComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  {
  user: any;
  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";
  tipo_usuario = "";
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


   //  Verifica si hay un usuario autenticado en PostgreSQL
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
      this.placa = usuario.placa;
      this.tipo_usuario = usuario.tipo_usuario;
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
          placa: this.placa,
          tipo_usuario: this.tipo_usuario
        });

        this.PopUpsComponent.desplegarSuccess("Los datos se han actualizado");

      });
      
    } catch (error) {
      this.PopUpsComponent.desplegarError("Error al actualizar los datos");
    }
  }
}
