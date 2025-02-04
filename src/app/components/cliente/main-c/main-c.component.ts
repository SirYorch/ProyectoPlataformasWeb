import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { MenuCComponent } from "../menu-c/menu-c.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";

@Component({
  selector: 'app-main-c',
  standalone: true,
  imports: [MenuCComponent, ParqueaderoComponent],
  templateUrl: './main-c.component.html',
  styleUrl: './main-c.component.scss'
})
export class MainCComponent implements OnInit {

  constructor(
    private googleuser: GoogleAuthService,
    private read: ReadService,
    private router: Router,
    private userService: UserInfoService
  ) {}

  user: any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Dia";
  plazas = "0";
  val1 = "0";
  val2 = "0";
  val3 = "0";
  val4 = "0";
  val5 = "0";
  val6 = "0";
  val7 = "0";
  val8 = "0";

  async ngOnInit(): Promise<void> {
    // Leer los datos del usuario desde el localStorage
    this.user = this.userService.getUser();
    
    if (!this.user) {
      console.log("No hay usuario en localStorage. Redirigiendo a login...");
      this.router.navigate(['login']);
      return;
    }

    try {
      // 🔹 Verificar si el usuario existe en PostgreSQL en lugar de Firestore
      const usuario = await this.googleuser.getUserInfo(this.user.uid);
      
      if (!usuario) {
        console.log("Usuario no encontrado en PostgreSQL. Redirigiendo a login...");
        this.router.navigate(['login']);
        return;
      }

      // 🔹 Validar el tipo de usuario correctamente
      if (usuario.tipo_usuario !== 'CLIENTE') {
        console.log("El usuario no es cliente. Redirigiendo...");
        if (usuario.tipo_usuario === 'ADMIN') {
          this.router.navigate(['admin/principal']);
        } else {
          this.router.navigate(['']);
        }
        return;
      }

      // ✅ Usuario válido → Cargar sus datos y tarifas desde PostgreSQL
      this.nombre = usuario.nombre;

      const tarifas = await this.googleuser.getTarifas();
      if (tarifas) {
        this.val1 = tarifas['tarifas1'];
        this.val2 = tarifas['tarifas2'];
        this.val3 = tarifas['tarifas3'];
        this.val4 = tarifas['tarifas4'];
        this.val5 = tarifas['tarifas5'];
        this.val6 = tarifas['tarifas6'];
        this.val7 = tarifas['tarifas7'];
        this.val8 = tarifas['tarifas8'];
        this.estado = tarifas['parqueaderoEstado'];
        this.motd = tarifas['motd'];
        this.plazas = tarifas['plazasDisponibles'];
      }

      console.log("Usuario validado correctamente:", usuario);

    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
      this.router.navigate(['login']);
    }
  }
}
