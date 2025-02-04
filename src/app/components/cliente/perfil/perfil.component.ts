import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuCComponent } from "../menu-c/menu-c.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuCComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  {
  
  constructor(private googleuser: GoogleAuthService, private router: Router, private userService: UserInfoService) {}

  user: any;
  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";
  tipo_usuario = "";

  

  async guardarInfo() {
    await this.googleuser.actualizarUsuario(this.user.uid, {
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      cedula: this.cedula,
      placa: this.placa,
      tipo_usuario: this.tipo_usuario
    });

    console.log("Información actualizada correctamente");
  }
}
