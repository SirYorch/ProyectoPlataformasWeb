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



}
