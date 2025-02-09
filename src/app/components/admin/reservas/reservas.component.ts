import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { UserInfoService } from '../../../services/user-info.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { ReservaService } from '../../../services/reserva.service';
import { PopUpsComponent } from '../../extras/pop-ups/pop-ups.component';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [MenuComponent, CommonModule, ParqueaderoComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {

  user: any;
  tipo: Promise<string> | undefined;


  reservas: {
  id:number, 
  inicio:Date , 
  lugar:{
    id:number,
    estado:string,
    posicion:string
  },
  ticket:{
    id:number,
    fin:Date,
    inicio:Date,
    fechaInicio:Date,
    fechaFin:Date,
    precio:number,
    usuario:{
      
        uid:string,
        nombre:string,
        telefono:string,
        direccion:string,
        cedula:string,
        placa:string,
      
    }
  }}[] = [
    {
      "id": 1,
      "ticket": {
          "id": 1,
          "inicio": new Date(1698210000000),
          "fin": new Date(1698210000000),
          "fechaInicio": new Date(1698210000000),
          "fechaFin": new Date(1698210000000),
          "precio": 50.0,
          "usuario": {
              "uid": "OvvSMLQjVheidapLh83sbca4ujv2",
              "nombre": "Cristofer",
              "telefono": "1111111111",
              "direccion": "a;lskd;alksvnfjsf",
              "cedula": "1111111111",
              "placa": "ddd-222"
          }
      },
      "inicio": new Date(1698210000000),
      "lugar": {
          "id": 3,
          "estado": "disponible",
          "posicion": "A3"
      }
  }
  ];

      @ViewChild('ver', { read: ElementRef }) vistaParking!: ElementRef;
      @ViewChild('ver') vistaParkingO!: ParqueaderoComponent;
  reservasProm: Promise<any[]> | undefined;

    verEspacio(id: number) {
      this.vistaParkingO.cambiarVisibilidad(id);
      this.vistaParking.nativeElement.classList.remove("parking-hidden")
      setTimeout(()=>{this.vistaParking.nativeElement.classList.add("parking-hidden")},5000)
    }

    eliminarReserva(id: number) {
      this.reservasService.eliminarReserva(id).then(()=>{

        this.reservasProm = this.reservasService.obtenerReservas();
        this.reservasProm.then(response=>{
          console.log(response)
          this.reservas = response;
        })
      }) ; 
    }
      

  async ngOnInit(): Promise<void> {
    this.validarUsuario();


    this.reservasProm = this.reservasService.obtenerReservas();
    this.reservasProm.then(response=>{
      console.log(response)
      this.reservas = response;
    })

    
   }

     constructor(
       private usuarioService: UsuarioService,
       private router: Router,
       private userService: UserInfoService,
       private reservasService: ReservaService
     ) {}
 
   validarUsuario(){
 
     this.user = this.userService.getUser();
     this.tipo = this.userService.validarUsuario(this.user).then(tipo => tipo ?? "ERROR");
     this.tipo?.then(tipoUsuario => {
       switch (tipoUsuario) {
       case 'ADMIN':
         break;
       case 'CLIENTE':
         this.router.navigate(['cliente/principal']);
         break;
       case 'ERROR':
       default:
         console.log("⚠️ Tipo de usuario desconocido o error. Redirigiendo a login.");
         this.router.navigate(['/login']);
         break;
       }
     }).catch(error => {
       console.error("Error al validar el usuario:", error);
       this.router.navigate(['/login']);
     });
   }

}
