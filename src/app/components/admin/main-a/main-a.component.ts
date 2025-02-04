import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { TarifaService } from '../../../services/tarifa.service'; // 📌 Servicio para obtener tarifas
@Component({
  selector: 'app-main-a',
  standalone: true,
  imports: [MenuComponent, ParqueaderoComponent],
  templateUrl: './main-a.component.html',
  styleUrl: './main-a.component.scss'
})
export class MainAComponent implements OnInit {
  user: any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Día";
  plazas = "0";
  val1 = "0";
  val2 = "0";
  val3 = "0";
  val4 = "0";
  val5 = "0";
  val6 = "0";
  val7 = "0";
  val8 = "0";
  constructor(
    private usuarioService: UsuarioService,
    private tarifaService: TarifaService,
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
      //  Obtener la información del usuario desde PostgreSQL
      const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);
      
      if (!usuario || usuario.tipo_usuario !== 'ADMIN') {
        this.router.navigate(['']);
        return;
      }

      this.nombre = usuario.nombre;
      this.estado = "Activo"; // Puedes cambiar esto según tus datos
      this.motd = "Bienvenido al sistema"; // Mensaje de prueba
      this.plazas = "50"; // Número de plazas de prueba

      //  Obtener tarifas desde PostgreSQL
      const tarifas = await this.tarifaService.obtenerTarifas();
      if (tarifas) {
        this.val1 = tarifas.tarifa1;
        this.val2 = tarifas.tarifa2;
        this.val3 = tarifas.tarifa3;
        this.val4 = tarifas.tarifa4;
        this.val5 = tarifas.tarifa5;
        this.val6 = tarifas.tarifa6;
        this.val7 = tarifas.tarifa7;
        this.val8 = tarifas.tarifa8;
      }
    } catch (error) {
      console.error(' Error al validar el usuario:', error);
      this.router.navigate(['login']);
    }
  }
}
