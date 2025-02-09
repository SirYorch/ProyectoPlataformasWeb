import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { TarifaService } from '../../../services/tarifa.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../../services/user-info.service';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { PublicoService } from '../../../services/publico.service';
import { PopUpsComponent } from "../../extras/pop-ups/pop-ups.component";
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule, MenuComponent, CommonModule, PopUpsComponent, ConfirmDialogsComponent],
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})
export class TarifasComponent {
  user: any;
  tipo: Promise<string> | undefined;
  tarifasProm: Promise<any[]> | undefined;
  publico: any;

desplegarCrearTarifa() {
  this.crear.nativeElement.classList.toggle("desplegarCrear");
}
desplegarEditar(arg0: null) {
throw new Error('Method not implemented.');
}
Descripcion: any;
Precio: any;
guardarEditar() {
throw new Error('Method not implemented.');
}

@ViewChild('crear') crear!: ElementRef;

constructor(
  private googleuser: GoogleAuthService,
  private read: ReadService,
  private router: Router,
  private userService: UserInfoService,
  private usuarioService: UsuarioService,
  private tarifaService: TarifaService,
  private publicoService: PublicoService
) {}
    
  motd = "Mensaje del dia";
  tarifas: {descripcion:string , precio:number,id:number}[] = [{
    descripcion: "Tarifa básica",
    precio: 10.50,
    id: 0
}];

  
  guardarDatos(){
    this.ConfirmDialogsComponent.desplegarConfirmacion("Se actualizaran todas las tarifas y el mensaje del dia a los datos actuales, desea continuar?",()=>{
    
    try{  this.publico.motd = this.motd;
    console.log(this.publico);
    this.publicoService.ActualizarDatos(this.publico);

    
    for(let dato of this.tarifas){
      this.tarifaService.actualizarTarifa(dato.id,dato)
    }
    this.PopUpsComponent.desplegarSuccess("Se han actualizado los datos")
  }catch(error){
    this.PopUpsComponent.desplegarError("Se ha producido un error")
  }
    })
  }


  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 
    this.tarifasProm = this.tarifaService.obtenerTarifas();
    this.tarifasProm.then(valor =>{
      this.tarifas = valor;
    })

    setTimeout(()=>{console.log(this.tarifas)},1000)
    

    //metodo para poder crear tarifas.

    //metodo para poder editar tarifas.


    this.publico = await this.publicoService.obtenerDatos();
    this.motd = this.publico.motd;

   }

  CrearTarifa() {
    const tarifa = {
      descripcion: this.Descripcion,
      precio: this.Precio
    }  
    this.tarifaService.crearTarifa(tarifa).then(()=>{
      this.tarifasProm = this.tarifaService.obtenerTarifas();
      this.tarifasProm.then(valor =>{
        this.tarifas = valor;
      })
      this.PopUpsComponent.desplegarSuccess("Se ha agregado correctamente a la base de datos")  
    })
  }

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

  EliminarTarifa(tarifa:any){
    this.ConfirmDialogsComponent.desplegarConfirmacion("Esta seguro de querer eliminar la tarifa?",()=>{
      this.tarifaService.eliminarTarifa(tarifa.id).then(response=>{
        this.tarifasProm = this.tarifaService.obtenerTarifas();
        this.tarifasProm.then(valor =>{
          this.tarifas = valor;
        })    
        this.PopUpsComponent.desplegarSuccess("Se ha eliminado correctamente")
      }).catch(()=>{
        this.PopUpsComponent.desplegarError("Se ha producido un error")
      })
      
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
