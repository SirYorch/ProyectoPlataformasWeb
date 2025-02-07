import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { ParqueaderoComponent } from '../../extras/parqueadero/parqueadero.component';

@Component({
  selector: 'app-perfil-c',
  standalone: true,
  imports: [FormsModule, MenuComponent, ParqueaderoComponent],
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

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();

    if (!this.user) {
      console.warn("⚠️ Usuario no autenticado, redirigiendo a login...");
      this.router.navigate(['login']);
      return;
    }

    try {
      //  Obtener la información del usuario desde PostgreSQL
      const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);

      if (!usuario) {
        console.warn("⚠️ Usuario no encontrado en la base de datos, redirigiendo a login...");
        this.router.navigate(['login']);
        return;
      }

      if (usuario.tipo_usuario !== 'CLIENTE') {
        console.warn(" Acceso denegado: Solo CLIENTES pueden acceder a su perfil.");
        this.router.navigate(['login']);
        return;
      }

      //  Cargar datos en el formulario
      this.nombre = usuario.nombre;
      this.telefono = usuario.telefono;
      this.direccion = usuario.direccion;
      this.cedula = usuario.cedula;
      this.placas = usuario.placa;
      this.stat = usuario.tipo_usuario;

      console.log(" Perfil cliente cargado con éxito:", usuario);

    } catch (error) {
      console.error(' Error al validar el usuario:', error);
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
        placa: this.placas
      });

      console.log(" Usuario actualizado correctamente");

      this.mensajeConfirmacion = "✔ Cambios guardados correctamente.";
      setTimeout(() => {
        this.mensajeConfirmacion = "";
      }, 3000);

    } catch (error) {
      console.error(" Error al actualizar usuario:", error);
      this.mensajeConfirmacion = " Error al guardar cambios.";
    }
  }
}
