import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-espacio',
  standalone: true,
  imports: [FormsModule, MenuComponent],
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
  parqueaderoEstado = "0";
  plazasDisponibles = "0";
  tarifas1 = "0";
  tarifas2 = "0";
  tarifas3 = "0";
  tarifas4 = "0";
  tarifas5 = "0";
  tarifas6 = "0";
  tarifas7 = "0";
  tarifas8 = "0";
  

  user:any;

  guardarDatos(){
    this.googleuser.saveTarifas(
      {
        motd:this.motd,
        parqueaderoEstado: this.parqueaderoEstado,
        plazasDisponibles:this.plazasDisponibles,
        tarifas1:this.tarifas1,
        tarifas2:this.tarifas2,
        tarifas3:this.tarifas3,
        tarifas4:this.tarifas4,
        tarifas5:this.tarifas5,
        tarifas6:this.tarifas6,
        tarifas7:this.tarifas7,
        tarifas8:this.tarifas8,
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
      this.parqueaderoEstado = tarifas.parqueaderoEstado;
      this.plazasDisponibles = tarifas.plazasDisponibles;
      this.tarifas1 = tarifas.tarifas1;
      this.tarifas2 = tarifas.tarifas2;
      this.tarifas3 = tarifas.tarifas3;
      this.tarifas4 = tarifas.tarifas4;
      this.tarifas5 = tarifas.tarifas5;
      this.tarifas6 = tarifas.tarifas6;
      this.tarifas7 = tarifas.tarifas7;
      this.tarifas8 = tarifas.tarifas8;
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
