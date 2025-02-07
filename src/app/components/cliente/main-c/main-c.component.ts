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
  tarifas: any[] = []; // ✅ Ahora se maneja un array de tarifas

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

  async ngOnInit(): Promise<void> {
    // this.user = this.userService.getUser();



    // if (!this.user) {
    //   this.router.navigate(['login']);
    //   return;
    // }

    // try {
    //   //  Obtener la información del administrador desde PostgreSQL
    //   const usuario = await this.usuarioService.obtenerUsuario(this.user.uid);

    //   if (!usuario || usuario.tipo_usuario !== 'CLIENTE') {
    //     this.router.navigate(['']);
    //     return;
    //   }

    //   // Obtener tarifas desde PostgreSQL
    //   this.tarifas = await this.tarifaService.obtenerTarifas();
    // } catch (error) {
    //   console.error("Error al obtener tarifas:", error);
    // }
  }
}
