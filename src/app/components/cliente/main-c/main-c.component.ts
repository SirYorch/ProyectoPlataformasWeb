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
export class MainCComponent{

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

}
