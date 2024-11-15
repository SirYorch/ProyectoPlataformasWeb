  import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-main-c',
  standalone: true,
  imports: [],
  templateUrl: './main-c.component.html',
  styleUrl: './main-c.component.scss'
})
export class MainCComponent implements OnInit{

  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }

  nombre = "Usuario";
  estado = "Inactivo";

  constructor(private googleuser: GoogleAuthService,private read: ReadService){

  }

  user:any ;
  ngOnInit(){
    this.user = this.googleuser.getUser();
    this.iniciarDatos();
    this.estado = this.read.getEstado();
  }
  iniciarDatos(){
    console.log(this.user)
    this.nombre = this.user.nombre;
  }


}
