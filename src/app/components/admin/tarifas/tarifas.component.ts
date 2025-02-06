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
export class TarifasComponent {

 constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }
    
  motd = "0";
  parqueaderoEstado = "0";
  plazasDisponibles = "0";
  tarifas: {descripcion:string , precio:number}[] = [];

  
  guardarDatos(){
    this.googleuser.saveTarifas(
      {
        motd:this.motd,
        parqueaderoEstado: this.parqueaderoEstado,
        plazasDisponibles:this.plazasDisponibles
      }
    );
  }

  user:any = null;
  
  
}
