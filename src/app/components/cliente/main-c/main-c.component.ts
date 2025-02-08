import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { MenuCComponent } from "../menu-c/menu-c.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { TarifaService } from '../../../services/tarifa.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { ConfirmDialogsComponent } from '../../extras/confirm-dialogs/confirm-dialogs.component';
import { PopUpsComponent } from '../../extras/pop-ups/pop-ups.component';

@Component({
  selector: 'app-main-c',
  standalone: true,
  imports: [CommonModule, MenuCComponent, ParqueaderoComponent, ConfirmDialogsComponent, PopUpsComponent],
  templateUrl: './main-c.component.html',
  styleUrl: './main-c.component.scss'
})
export class MainCComponent implements OnInit {

  user: any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Día";
  plazas = "0";
  tarifas: any[] = [{
      descripcion: "Tarifa básica",
      precio: 10.50
  },
  {
      descripcion: "Tarifa estándar",
      precio: 15.75
  },
  {
      descripcion: "Tarifa premium",
      precio: 25.00
  }]
  tipo: Promise<string> | undefined;

  constructor(
    private tarifaService: TarifaService,
    private router: Router,
    private userService: UserInfoService,
    private usuarioService: UsuarioService
  ) {}


    @ViewChild(PopUpsComponent) PopUpsComponent!: PopUpsComponent;
    @ViewChild(ConfirmDialogsComponent) ConfirmDialogsComponent!: ConfirmDialogsComponent;
    
    @ViewChild('entrar', { read: ElementRef }) entrar!: ElementRef;
    @ViewChild('reservar', { read: ElementRef }) reservar!: ElementRef;
    @ViewChild('entrar') entrarComponent!: ParqueaderoComponent;
    @ViewChild('reservar') reservarComponent!: ParqueaderoComponent;
  

    

    desplegarExito(){
      this.PopUpsComponent.desplegarSuccess("Se muestra un mensaje de exito");
    }
    desplegarError(){
      this.PopUpsComponent.desplegarError("Se meustra un mensaje de error");
    }
    desplegarConfirmacion(){
      this.ConfirmDialogsComponent.desplegarConfirmacion("Quiere enviar un cuadro de exito?", ()=>this.desplegarError());
    }

    desplegarEntrar() {
      this.entrar.nativeElement.classList.remove("parking-hidden");
      this.reservar.nativeElement.classList.add("parking-hidden");
      this.entrarComponent.cambiarSeleccionOcupar(()=>{this.ocultarReservar();});
      this.entrarComponent.cambiarMensaje("Seleccione un lugar para ocupar");
    }
    desplegarReservar() {
      this.entrar.nativeElement.classList.remove('parking-hidden');
      this.reservar.nativeElement.classList.add('parking-hidden');
      this.reservarComponent.cambiarSeleccionReservar(()=>{this.ocultarEntrar();});
      this.entrarComponent.cambiarMensaje("Seleccione un lugar para reservar");
    }

    ocultarEntrar() {
      this.entrar.nativeElement.classList.add('parking-hidden');
      this.reservar.nativeElement.classList.add('parking-hidden');
    }
    ocultarReservar() {
      this.reservar.nativeElement.classList.add('parking-hidden');
      this.entrar.nativeElement.classList.add('parking-hidden');
    }
  //  Verifica si hay un usuario autenticado en PostgreSQL
  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 
 
    //mostrar mensajes personalizados de usuario.

    //mostrar mensaje del dia

    //enviar solicitud para entrar y ocupar un espacio.

    //enviar solicitud para reservar un espacio.

    //enviar solicitud para salir del parqueadero.

    //cambiar el boton de entrar a salir, cuando el vehiculo tenga un ticket sin fechaSalida.

    //no pedir seleccion de espacio si existe una reserva.

    //cargar las tarifas del parqueadero desde la base de datos.


    //cargar los lugares y transformarlos desde el la app de parqueadero.
   }
 
   validarUsuario(){
 
     this.user = this.userService.getUser();
     this.tipo = this.userService.validarUsuario(this.user).then(tipo => tipo ?? "ERROR");
     this.tipo?.then(tipoUsuario => {
       switch (tipoUsuario) {
       case 'ADMIN':
         break;
       case 'CLIENTE':
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
