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
    this.user = this.userService.getUser();

     if (!this.user) {
       this.router.navigate(['login']);
       return;
     }

     try {
       //  Obtener datos del usuario desde PostgreSQL
       const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);

       if (!usuario || usuario.tipo_usuario !== 'CLIENTE') {
         this.router.navigate(['']);
         return;
       }

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

  async guardarInfo() {
    try {
      await this.usuarioService.actualizarUsuario(this.user.uid, {
        nombre: this.nombre,
        telefono: this.telefono,
        direccion: this.direccion,
        cedula: this.cedula,
        placa: this.placa,
        tipo_usuario: this.tipo_usuario
      });

      console.log("Información actualizada correctamente");
      alert("✔ Cambios guardados correctamente.");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al guardar cambios.");
    }
  }
}
