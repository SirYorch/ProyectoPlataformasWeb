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
import { PublicoService } from '../../../services/publico.service';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-main-c',
  standalone: true,
  imports: [CommonModule, MenuCComponent, ParqueaderoComponent, ConfirmDialogsComponent, PopUpsComponent],
  templateUrl: './main-c.component.html',
  styleUrl: './main-c.component.scss'
})
export class MainCComponent implements OnInit {

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
    user: any;
  usuario:any;
  publico:any;
  nombre = "Usuario";
  estado = "Inactivo";
  motd = "Mensaje del Día";
  
  // Ahora las tarifas se manejarán en un array
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
}]; //valores predeterminados, se deberan borrar cuando se tomen los nuevos.
  tipo: Promise<string> | undefined;
  horarios: any[] | undefined;
  tarifasProm: Promise<any[]> | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private tarifaService: TarifaService,
    private router: Router,
    private userService: UserInfoService,
    private publicoService: PublicoService,
    private horarioService: HorarioService,
    private tarifasService: TarifaService,
  ) {}

  
  async ngOnInit(): Promise<void> {
    this.validarUsuario();
 

    this.usuario = await this.usuarioService.obtenerUsuario(this.user.uid);
    this.nombre = this.usuario.nombre;

    this.publico = await this.publicoService.obtenerDatos();
    this.motd = this.publico.motd;

    this.horarios = await this.horarioService.getHorarios();
    this.checkEstadoParqueadero(this.horarios);

    this.tarifasProm = this.tarifaService.obtenerTarifas();
    this.tarifasProm.then(valor =>{
      this.tarifas = valor;
    })

    //enviar solicitud para entrar y ocupar un espacio.

    //enviar solicitud para reservar un espacio.

    //enviar solicitud para salir del parqueadero.

    //comprobar que no exista una reserva para entrar y elegir un espacio.
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

checkEstadoParqueadero(horarios:any[]) {
  const fechaActual = new Date(); // Obtiene la fecha y hora actual del dispositivo
  const diaSemana = fechaActual.getDay(); // Obtiene el día de la semana (0: domingo, 1: lunes, ..., 6: sábado)
  
    // 1. Comparar con la lista de horarios
    for (const horario of horarios) {
      const fechaInicio = new Date(horario.fechaInicio);
      const fechaFin = new Date(horario.fechaFin);

      // Verificar si la fecha actual está dentro del rango del horario
      if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
        return this.verificarHora(fechaActual, horario); // Verificar la hora
      }
    }

    // 2. Si no coincide con ningún horario, verificar la lista publico
    if (diaSemana >= 1 && diaSemana <= 5) {
      // Lunes a viernes
      const fechaInicio1 = new Date(this.publico.fechaInicio1);
      const fechaFin1 = new Date(this.publico.fechaFin1);
      return this.verificarHora(fechaActual, { fechaInicio: fechaInicio1, fechaFin: fechaFin1 });
    } else if (diaSemana === 0 || diaSemana === 6) {
      // Sábado o domingo
      const fechaInicio2 = new Date(this.publico.fechaInicio2);
      const fechaFin2 = new Date(this.publico.fechaFin2);
      return this.verificarHora(fechaActual, { fechaInicio: fechaInicio2, fechaFin: fechaFin2 });
    }

    return 'Horario no disponible'; // Si no se encuentra un horario válido
}

private verificarHora(fechaActual: Date, horario: any){
  const horaActual = fechaActual.getHours();
  const minutosActual = fechaActual.getMinutes();
  const horaInicio = horario.fechaInicio.getHours();
  const minutosInicio = horario.fechaInicio.getMinutes();
  const horaFin = horario.fechaFin.getHours();
  const minutosFin = horario.fechaFin.getMinutes();

  // Convertir todo a minutos para facilitar la comparación
  const totalMinutosActual = horaActual * 60 + minutosActual;
  const totalMinutosInicio = horaInicio * 60 + minutosInicio;
  const totalMinutosFin = horaFin * 60 + minutosFin;

  if (totalMinutosActual >= totalMinutosInicio && totalMinutosActual <= totalMinutosFin) {
    this.estado = "Abierto"
  } else {
    this.estado = "Cerrado"
  }
}
}
