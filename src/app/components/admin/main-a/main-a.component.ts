import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { TarifaService } from '../../../services/tarifa.service'; // 📌 Servicio para obtener tarifas
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-a',
  standalone: true,
  imports: [MenuComponent, ParqueaderoComponent, CommonModule],
  templateUrl: './main-a.component.html',
  styleUrl: './main-a.component.scss'
})
export class MainAComponent implements OnInit {
  user: any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Día";
  plazas = "0";
  
  // Ahora las tarifas se manejarán en un array
  tarifas: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private tarifaService: TarifaService,
    private router: Router,
    private userService: UserInfoService
  ) {}

  async ngOnInit(): Promise<void> {
    // this.user = this.userService.getUser();

    // if (!this.user) {
    //   this.router.navigate(['login']);
    //   return;
    // }

    // try {
    //   //  Obtener la información del usuario desde PostgreSQL
    //   const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);
      
    //   if (!usuario || usuario.tipo_usuario !== 'ADMIN') {
    //     this.router.navigate(['']);
    //     return;
    //   }

    //   this.nombre = usuario.nombre;
    //   this.estado = "Activo"; // Puedes cambiar esto según tus datos
    //   this.motd = "Bienvenido al sistema"; // Mensaje de prueba
    //   this.plazas = "50"; // Número de plazas de prueba

    //   // Obtener tarifas desde PostgreSQL
    //   this.tarifas = await this.tarifaService.obtenerTarifas();
      
    // } catch (error) {
    //   console.error(' Error al validar el usuario:', error);
    //   this.router.navigate(['login']);
    // }
  }
}
