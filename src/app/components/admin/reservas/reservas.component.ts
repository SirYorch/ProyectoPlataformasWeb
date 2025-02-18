import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { UserInfoService } from '../../../services/user-info.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { ReservaService } from '../../../services/reserva.service';
import { PopUpsComponent } from '../../extras/pop-ups/pop-ups.component';
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [MenuComponent, CommonModule, ParqueaderoComponent, ConfirmDialogsComponent, PopUpsComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {

  user: any;
  tipo: Promise<string> | undefined;


  usuarios:any;

      @ViewChild('ver', { read: ElementRef }) vistaParking!: ElementRef;
      @ViewChild('ver') vistaParkingO!: ParqueaderoComponent;
  usuariosSinFiltro: any[] | undefined;
  usuariosProm: void | undefined;

    verEspacio(id: number) {
      this.vistaParkingO.cambiarVisibilidad(id);
      this.vistaParking.nativeElement.classList.remove("parking-hidden")
      setTimeout(()=>{this.vistaParking.nativeElement.classList.add("parking-hidden")},5000)
    }

    async eliminarReserva(id: number) {
      this.ConfirmDialogsComponent.desplegarConfirmacion("Está seguro de querer eliminar la reserva?",()=>{
      this.reservasService.eliminarReserva(id).then(async ()=>{
      // this.usuariosProm = await this.usuarioService.obtenerUsuarios().then(
      //   res=>{
      //     console.log(res)
      //   }
      // );
      }) ; 
      })
    }
      

  async ngOnInit() {
    this.validarUsuario();

    
    this.usuarioService.obtenerUsuarios().subscribe(
      res=>{
        this.usuarios = [];
        for(let valor of res){
          if(valor.reserva){
            this.usuarios.push(valor)
          }
        }
        console.log(res)
      }
      
    )
    

    // this.usuariosProm = await this.usuarioService.obtenerUsuarios().then(
    //   res=>{
    //     console.log(res)
    //   }
    // );
    
    
   }

     constructor(
       private usuarioService: UsuarioService,
       private router: Router,
       private userService: UserInfoService,
       private reservasService: ReservaService
     ) {}
 
     

  @ViewChild(PopUpsComponent) PopUpsComponent!: PopUpsComponent;
  @ViewChild(ConfirmDialogsComponent) ConfirmDialogsComponent!: ConfirmDialogsComponent;
  
  
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
