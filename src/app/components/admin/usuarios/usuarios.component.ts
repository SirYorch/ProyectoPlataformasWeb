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

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private userService = inject(UserInfoService);

  async ngOnInit(): Promise<void> {
    try {
      this.usuarios = await this.usuarioService.obtenerUsuarios(); // ✅ Ahora usamos await en la Promise
      console.log("Usuarios obtenidos:", this.usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
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
