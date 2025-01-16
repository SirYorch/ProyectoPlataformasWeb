import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { UserInfoService } from '../../../services/user-info.service';
import { Router } from '@angular/router';
import { ReadService } from '../../../services/read.service';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";


@Component({
  selector: 'app-main-a',
  standalone: true,
  imports: [MenuComponent, ParqueaderoComponent],
  templateUrl: './main-a.component.html',
  styleUrl: './main-a.component.scss'
})
export class MainAComponent {


  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){
  }

  
  user:any ;

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
      // Redirigir al inicio de sesión si el usuario no está en localStorage
      this.router.navigate(['login']); // Redirigir en caso de error
      return; // Terminar la ejecución del método
    }
    
    try {
      // Verificar si el usuario existe en Firestore
      const userExists = await this.googleuser.checkUserExists(this.user.uid);
       // Obtener información pública desde Firestore
      const publico = await this.googleuser.getTarifas();
      if (publico) {
        this.val1 = publico['tarifas1'];
        this.val2 = publico['tarifas2'];
        this.val3 = publico['tarifas3'];
        this.val4 = publico['tarifas4'];
        this.val5 = publico['tarifas5'];
        this.val6 = publico['tarifas6'];
        this.val7 = publico['tarifas7'];
        this.val8 = publico['tarifas8'];
        this.estado = publico['parqueaderoEstado']
        this.motd = publico['motd']
        this.plazas = publico['plazasDisponibles']
      }


      if (!userExists) {
        
      this.router.navigate(['login']); // Redirigir en caso de error
        return; // Terminar la ejecución del método
      }
      
      // Obtener la información del usuario
      const usuario = await this.googleuser.getUserInfo(this.user.uid);
      if (!usuario || usuario.stat !== 'Admin') {
        // Redirigir al inicio si el estado del usuario no es 'Cliente'
        
      this.router.navigate(['']); // Redirigir en caso de error
      }else{
        this.nombre = usuario.nombre;

      }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
    }
  }
}
