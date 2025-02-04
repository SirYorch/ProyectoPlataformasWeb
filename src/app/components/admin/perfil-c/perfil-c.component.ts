import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service'; // 📌 Usar UsuarioService

@Component({
  selector: 'app-perfil-c',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './perfil-c.component.html',
  styleUrl: './perfil-c.component.scss'
})
export class PerfilCComponent {
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
    this.user = this.userService.getOtherUser();
    const userA = this.userService.getUser();

    if (!this.user) {
      this.router.navigate(['login']);
      return;
    }

    try {
      const usuario = await this.usuarioService.obtenerUsuario(this.user);
      const usuarioA = await this.usuarioService.obtenerUsuario(userA.uid);

      if (!usuario || usuarioA.tipo_usuario !== 'ADMIN') {
        this.router.navigate(['']);
        return;
      }

      //  Cargar datos en el formulario
      this.nombre = usuario.nombre;
      this.telefono = usuario.telefono;
      this.direccion = usuario.direccion;
      this.cedula = usuario.cedula;
      this.placas = usuario.placa;
      this.stat = usuario.tipo_usuario;
    } catch (error) {
      console.error(' Error durante la validación del usuario:', error);
    }
  }

  async guardarInfo() {
    try {
      await this.usuarioService.actualizarUsuario(this.user, {
        nombre: this.nombre,
        telefono: this.telefono,
        direccion: this.direccion,
        cedula: this.cedula,
        placa: this.placas,
        tipo_usuario: this.stat
      });

      console.log(" Usuario actualizado correctamente");

      // ✅ Mostrar mensaje de confirmación
      this.mensajeConfirmacion = "✔ Cambios guardados correctamente.";
      setTimeout(() => {
        this.mensajeConfirmacion = ""; // Ocultar mensaje después de 3 segundos
      }, 3000);

    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      this.mensajeConfirmacion = " Error al guardar cambios.";
    }
  }
}
