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
export class TarifasComponent {

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
  }

  user:any = null;
  
  
}
