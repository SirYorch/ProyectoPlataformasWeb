import { Component, OnInit } from '@angular/core';
import { TarifaService } from '../../../services/tarifa.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../../services/user-info.service';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule, MenuComponent, CommonModule],
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})
export class TarifasComponent implements OnInit {

  constructor(
    private googleuser: GoogleAuthService,
    private read: ReadService,
    private router: Router,
    private userService: UserInfoService,
    private usuarioService: UsuarioService,
    private tarifaService: TarifaService
  ) {}

  motd = "0";
  parqueaderoEstado = "0";
  plazasDisponibles = "0";
  tarifas: { descripcion: string, precio: number }[] = [];
  user: any = null;

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

      // Obtener tarifas desde PostgreSQL
      this.tarifas = await this.tarifaService.obtenerTarifas();
      console.log("Tarifas obtenidas:", this.tarifas);

    } catch (error) {
      console.error("Error al obtener tarifas o usuario:", error);
    }
  }

  guardarDatos() {
    this.googleuser.saveTarifas({
      motd: this.motd,
      parqueaderoEstado: this.parqueaderoEstado,
      plazasDisponibles: this.plazasDisponibles
    });
  }
}
