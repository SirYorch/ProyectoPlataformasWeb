import { Component, OnInit } from '@angular/core';
import { TarifaService } from '../../../services/tarifa.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../../services/user-info.service';
@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule, MenuComponent, CommonModule],
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})
export class TarifasComponent implements OnInit {
  tarifas: any[] = [];
  motd = "";
  parqueaderoEstado = "";
  plazasDisponibles = "";
  user: any = null;

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

      if (!usuario || usuario.tipo_usuario !== 'ADMIN') {
        this.router.navigate(['']);
        return;
      }

      // Obtener tarifas desde PostgreSQL
      this.tarifas = await this.tarifaService.obtenerTarifas();
    } catch (error) {
      console.error("Error al obtener tarifas:", error);
    }
  }
  async actualizarTarifa(id: number, precio: number) {
    try {
      await this.tarifaService.actualizarTarifa(id, { precio });
      alert("Tarifa actualizada correctamente");
    } catch (error) {
      alert("Error al actualizar tarifa");
    }
  }

  async guardarDatos() {
    try {
      for (let tarifa of this.tarifas) {
        await this.tarifaService.actualizarTarifa(tarifa.id, tarifa);
      }
      alert("Tarifas actualizadas correctamente.");
    } catch (error) {
      console.error("Error al actualizar tarifas:", error);
      alert("Error al actualizar tarifas.");
    }
  }
}
