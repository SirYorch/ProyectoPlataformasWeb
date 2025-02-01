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
export class PerfilComponent implements OnInit {
  
  constructor(private googleuser: GoogleAuthService, private router: Router, private userService: UserInfoService) {}

  user: any;
  nombre = "";
  telefono = "";
  direccion = "";
  cedula = "";
  placa = "";
  tipo_usuario = "";

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    
    if (!this.user) {
      this.router.navigate(['login']);
      return;
    }

    try {
      const userExists = await this.googleuser.checkUserExists(this.user.uid);
      if (!userExists) {
        this.router.navigate(['login']);
        return;
      }

      const usuario = await this.googleuser.getUserInfo(this.user.uid);
      if (!usuario) {
        this.router.navigate(['']);
      } else {
        this.nombre = usuario.nombre;
        this.telefono = usuario.telefono;
        this.direccion = usuario.direccion;
        this.cedula = usuario.cedula;
        this.placa = usuario.placa;
        this.tipo_usuario = usuario.tipo_usuario;
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  }

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
