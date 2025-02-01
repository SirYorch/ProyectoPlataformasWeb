import { Component, OnInit, inject } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../admin/menu/menu.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];

  // Aseguramos que el servicio está correctamente inyectado
  private googleuser = inject(GoogleAuthService);
  private router = inject(Router);
  private userService = inject(UserInfoService);

  async ngOnInit(): Promise<void> {
    this.usuarios = (await this.googleuser.obtenerUsuarios()) || []; // ✅ FORZAMOS ARRAY VACÍO
  }
  

  verUsuario(uid: string) {
    this.userService.saveOtherUser(uid);
    this.router.navigate(['admin/perfilCliente']);
  }
}
