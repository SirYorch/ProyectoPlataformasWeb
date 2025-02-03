import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";

@Component({
  selector: 'app-espacio',
  standalone: true,
  imports: [FormsModule, MenuComponent, ParqueaderoComponent],
  templateUrl: './espacio.component.html',
  styleUrl: './espacio.component.scss'
})
export class EspacioComponent {
  
  totales ="0";
  disponibles = "0";
  ocupadas = "0";
  reservadas = "0";
  dia = "0";


  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }
  
  motd = "0";
  filas =0;
  columnas =0;
  

  user:any;

  guardarDatos(){
    this.googleuser.saveTarifas(
      {
        motd:this.motd,

      }
    );
    this.googleuser.saveEspacio({
        ocupados:this.ocupadas,
        reservados:this.reservadas,
        totales:this.totales,
        dia:this.dia,
      }
    )
  }
  
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
      const tarifas:any|null = await this.googleuser.getTarifas();
      const espacio:any|null = await this.googleuser.getEspacio();
      console.log(tarifas)
      console.log(espacio)
      this.motd = tarifas.motd;
      this.ocupadas = espacio.ocupados;
      this.reservadas = espacio.reservados;
      this.totales = espacio.totales;
      this.dia = espacio.dia;


      if (!userExists) {
        
      this.router.navigate(['login']); // Redirigir en caso de error
        return; // Terminar la ejecución del método
      }
      
      // Obtener la información del usuario
      const usuario = await this.googleuser.getUserInfo(this.user.uid);
      if (!usuario || usuario.stat !== 'Admin') {
        // Redirigir al inicio si el estado del usuario no es 'Cliente'
        
      this.router.navigate(['']); // Redirigir en caso de error
      }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
    }
  }
}
