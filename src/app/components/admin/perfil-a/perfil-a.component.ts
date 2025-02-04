import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";


@Component({
  selector: 'app-perfil-a',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './perfil-a.component.html',
  styleUrl: './perfil-a.component.scss'
})
export class PerfilAComponent {

  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }

  user:any ;
  nombre = "Usuario";
  telefono = "000000000";
  direccion = "Vivienda"
  cedula= "0000000000"
  placas= "AAA-0000"
  stat= "Cliente"
  


  async guardarInfo(){
    await this.googleuser.registerUser(this.user.uid,{
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      cedula: this.cedula,
      placa: this.placas,
    }) 
  }

}
