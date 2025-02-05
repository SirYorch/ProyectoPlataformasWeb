import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { MenuCComponent } from "../menu-c/menu-c.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { TarifaService } from '../../../services/tarifa.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-main-c',
  standalone: true,
  imports: [CommonModule, MenuCComponent, ParqueaderoComponent],
  templateUrl: './main-c.component.html',
  styleUrl: './main-c.component.scss'
})
export class MainCComponent implements OnInit {
  user: any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Día";
  plazas = "0";
  tarifas: any[] = []; // ✅ Ahora se maneja un array de tarifas

  constructor(
    private tarifaService: TarifaService,
    private router: Router,
    private userService: UserInfoService,
    private usuarioService: UsuarioService
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

      if (!usuario || usuario.tipo_usuario !== 'CLIENTE') {
        this.router.navigate(['']);
        return;
      }

      // Obtener tarifas desde PostgreSQL
      this.tarifas = await this.tarifaService.obtenerTarifas();
    } catch (error) {
      console.error("Error al obtener tarifas:", error);
    }
  }
}
