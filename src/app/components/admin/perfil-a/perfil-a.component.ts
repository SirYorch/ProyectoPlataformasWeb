import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-perfil-a',
  standalone: true,
  imports: [FormsModule, MenuComponent],
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
      //  Obtener la información del administrador desde PostgreSQL
      const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);

      if (!usuario || usuario.tipo_usuario !== 'ADMIN') {
        this.router.navigate(['']);
        return;
      }

      this.nombre = usuario.nombre;
      this.telefono = usuario.telefono;
      this.direccion = usuario.direccion;
      this.cedula = usuario.cedula;
      this.placas = usuario.placa;
      this.stat = usuario.tipo_usuario; //  Guardar el tipo de usuario


    } catch (error) {
      console.error(' Error durante la validación del usuario:', error);
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
        placa: this.placas,
        tipo_usuario: this.stat // ✅ Asegurar que se envía
      });
  
      alert("Información actualizada correctamente");
      console.log("Usuario actualizado en PostgreSQL");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar información");
    }
  }
  
}
