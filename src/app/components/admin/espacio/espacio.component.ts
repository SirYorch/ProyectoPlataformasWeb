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
  
}
