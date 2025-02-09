import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { EspacioService } from '../../../services/espacio.service';
import { PopUpsComponent } from "../../extras/pop-ups/pop-ups.component";
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";

@Component({
  selector: 'app-espacio',
  standalone: true,
  imports: [FormsModule, MenuComponent, ParqueaderoComponent, PopUpsComponent, ConfirmDialogsComponent],
  templateUrl: './espacio.component.html',
  styleUrl: './espacio.component.scss'
})
export class EspacioComponent implements AfterViewInit{
  tipo: Promise<string> | undefined;
  espacioProm: Promise<any[]> | undefined;
  espacio:any;
  filas = 0;
  columnas = 0;
  

  constructor(
    private googleuser: GoogleAuthService,
    private read: ReadService,
    private router:Router,
    private userService: UserInfoService,
    private espaciosService: EspacioService
  ){
  }
  
  @ViewChild(ParqueaderoComponent) parqueadero!: ParqueaderoComponent;
  @ViewChild(PopUpsComponent) PopUpsComponent!: PopUpsComponent;
  @ViewChild(ConfirmDialogsComponent) ConfirmDialogsComponent!: ConfirmDialogsComponent;

  desplegarExito(){
    this.PopUpsComponent.desplegarSuccess("Se muestra un mensaje de exito");
  }
  desplegarError(){
    this.PopUpsComponent.desplegarError("Se meustra un mensaje de error");
  }
  desplegarConfirmacion(){
    this.ConfirmDialogsComponent.desplegarConfirmacion("Quiere enviar un cuadro de exito?", ()=>this.desplegarError());
  }

  user:any;

  guardarDatos(){
    this.ConfirmDialogsComponent.desplegarConfirmacion("Si realiza un cambio, se eliminaran todas las reservas y espacios ocupados en este momento",()=>{this.espacio.filas = this.filas;
      this.espacio.columnas = this.columnas;
      this.espaciosService.saveDatos(this.espacio);
      window.location.reload();})
  }
  
  async ngAfterViewInit(): Promise<void> {
    this.validarUsuario();
    
    await this.parqueadero.ngOnInit();

    this.espacioProm = this.espaciosService.getEspacios();
    this.espacioProm.then(response=>{
      this.espacio = response;
      this.filas = this.espacio.filas;
      this.columnas = this.espacio.columnas;
      console.log(this.espacio)
    })
  }
   
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
