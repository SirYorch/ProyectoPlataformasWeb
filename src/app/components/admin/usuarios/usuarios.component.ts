import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../admin/menu/menu.component';
import { UsuarioService } from '../../../services/usuario.service'; // 📌 Usar UsuarioService

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  user: any = null;

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private userService = inject(UserInfoService);

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

      if (usuario.tipo_usuario !== 'ADMIN') {
        console.warn("Acceso denegado: Usuario CLIENTE intentando acceder a Usuarios ADMIN.");
        this.router.navigate(['login']);
        return;
      }

      // Obtener la lista de usuarios desde PostgreSQL
      this.usuarios = await this.usuarioService.obtenerUsuarios();
      console.log(" Usuarios obtenidos:", this.usuarios);

    } catch (error) {
      console.error(" Error al obtener usuarios:", error);
      this.router.navigate(['login']);
    }
  }

  verUsuario(uid: string) {
    this.userService.saveOtherUser(uid);
    this.router.navigate(['admin/perfilCliente']);
  }

  async eliminarUsuario(uid: string) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await this.usuarioService.eliminarUsuario(uid);
        this.usuarios = this.usuarios.filter(usuario => usuario.uid !== uid);
        console.log(` Usuario ${uid} eliminado de la lista.`);
      } catch (error) {
        console.error(" Error al eliminar usuario:", error);
      }
    }
  }
}
