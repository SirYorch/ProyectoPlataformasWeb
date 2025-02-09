import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { UserInfoService } from '../../../services/user-info.service';
import { HorarioService } from '../../../services/horario.service';
import { PublicoService } from '../../../services/publico.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuComponent],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss'
})
export class HorariosComponent {

  @ViewChild('crear') crear!: ElementRef;
  @ViewChild('editar') editar!: ElementRef;
  @ViewChild('editarGeneral') editarGeneral!: ElementRef;

  horarios: {
    id:number
    nombre: string,
    fechaInicio: Date,
    fechaFin: Date,
  }[] = [
    {
      id:1,
      nombre: "Horario Inocentes",
      fechaInicio: new Date("2025-02-07T08:00:00"),
      fechaFin: new Date("2025-02-07T12:00:00"),
    }];
  general: any;
  user: any;

  tipo: Promise<string> | undefined;

  publicoProm: Promise<any[]> | undefined;
  publico: any;
  horariosProm: Promise<any[]> | undefined;
  horarioGeneral: {id:number,motd:string,entrada1:Date,entrada2:Date,salida1:Date,salida2:Date}={
    entrada1:new Date(),
    entrada2:new Date(),
    salida1:new Date(),
    salida2:new Date(),
    id:1,
    motd:''
  };
  horaIniciogl: any;
  horaFingl: any;
  horaFings: any;
  horaIniciogs: any;
  horarioEditable: any;

  desplegarCrear() {
    this.crear.nativeElement.classList.add("desplegarCrear");
  }

  desplegarEditar(horario: any) {
    this.horarioEditable = horario
    // Convertir las fechas a objetos Date si no lo están
    horario.fechaInicio = new Date(horario.fechaInicio);
    horario.fechaFin = new Date(horario.fechaFin);
  
    console.log(horario);
  
    // Asignar el nombre del horario
    this.nombreHorario = horario.nombre;
  
    // Extraer y formatear la fecha de apertura (solo día, mes y año)
    const añoApertura = horario.fechaInicio.getFullYear();
    const mesApertura = ('0' + (horario.fechaInicio.getMonth() + 1)).slice(-2); // Meses van de 0 a 11
    const diaApertura = ('0' + horario.fechaInicio.getDate()).slice(-2);
    this.fechaApertura = `${añoApertura}-${mesApertura}-${diaApertura}`; // Formato YYYY-MM-DD
  
    // Extraer y formatear la hora de apertura
    const horasApertura = ('0' + horario.fechaInicio.getHours()).slice(-2); // Asegura dos dígitos
    const minutosApertura = ('0' + horario.fechaInicio.getMinutes()).slice(-2); // Asegura dos dígitos
    this.horaApertura = `${horasApertura}:${minutosApertura}`; // Formato HH:MM
  
    // Extraer y formatear la fecha de cierre (solo día, mes y año)
    const añoCierre = horario.fechaFin.getFullYear();
    const mesCierre = ('0' + (horario.fechaFin.getMonth() + 1)).slice(-2); // Meses van de 0 a 11
    const diaCierre = ('0' + horario.fechaFin.getDate()).slice(-2);
    this.fechaCierre = `${añoCierre}-${mesCierre}-${diaCierre}`; // Formato YYYY-MM-DD
  
    // Extraer y formatear la hora de cierre
    const horasCierre = ('0' + horario.fechaFin.getHours()).slice(-2); // Asegura dos dígitos
    const minutosCierre = ('0' + horario.fechaFin.getMinutes()).slice(-2); // Asegura dos dígitos
    this.horaCierre = `${horasCierre}:${minutosCierre}`; // Formato HH:MM
  
    // Mostrar el formulario de edición
    this.editar.nativeElement.classList.add("desplegarCrear");
  }

  desplegarEditarGeneral() {

    const horas1 = ('0' + this.horarioGeneral.entrada1.getHours()).slice(-2); // Asegura dos dígitos
    const minutos1 = ('0' + this.horarioGeneral.entrada1.getMinutes()).slice(-2); // Asegura dos dígitos
    this.horaIniciogl = `${horas1}:${minutos1}`; // Formato HH:MM
    
    const horas2 = ('0' + this.horarioGeneral.salida1.getHours()).slice(-2); // Asegura dos dígitos
    const minutos2 = ('0' + this.horarioGeneral.salida1.getMinutes()).slice(-2); // Asegura dos dígitos
    this.horaFingl = `${horas2}:${minutos2}`; // Formato HH:MM
    
    const horas3 = ('0' + this.horarioGeneral.entrada2.getHours()).slice(-2); // Asegura dos dígitos
    const minutos3 = ('0' + this.horarioGeneral.entrada2.getMinutes()).slice(-2); // Asegura dos dígitos
    this.horaIniciogs = `${horas3}:${minutos3}`; // Formato HH:MM
    
    const horas = ('0' + this.horarioGeneral.salida2.getHours()).slice(-2); // Asegura dos dígitos
    const minutos = ('0' + this.horarioGeneral.salida2.getMinutes()).slice(-2); // Asegura dos dígitos
    this.horaFings = `${horas}:${minutos}`; // Formato HH:MM
    

    this.editarGeneral.nativeElement.classList.add("desplegarCrear");
  }
  ocultarCrear() {
    this.crear.nativeElement.classList.remove("desplegarCrear");
  }
  ocultarEditar() {
    this.editar.nativeElement.classList.remove("desplegarCrear");
  }
  ocultarEditarGeneral() {
    this.editarGeneral.nativeElement.classList.remove("desplegarCrear");
  }

  eliminar(horario: any) {
    this.horarioService.deleteHorarios(horario.id).then(
      ()=>{
        this.horariosProm = this.horarioService.getHorarios();
    this.horariosProm.then(respuesta=>{
      this.horarios = respuesta
    })
      }
    )

    
  }

  horaApertura: any;
  horaCierre: any;
  
  nombreHorario= "";
  fechaApertura: Date|string = new Date();
  fechaCierre:Date|string = new Date();;
  horarioe:any;

  guardarEditar() {
    // Unir fecha y hora en un solo objeto Date
    const fechaAperturaCompleta = new Date(`${this.fechaApertura}T${this.horaApertura}:00`);

    // Unir fecha de cierre y hora de cierre
    const fechaCierreCompleta = new Date(`${this.fechaCierre}T${this.horaCierre}:00`);

    
    this.horarioEditable.fechaInicio = fechaAperturaCompleta;
    this.horarioEditable.fechaFin = fechaCierreCompleta;
    this.horarioEditable.nombre = this.nombreHorario

    console.log(this.horarioEditable)
    this.horarioService.guardarHorario(this.horarioEditable);
  }

  crearHorario() {

    // Unir fecha y hora en un solo objeto Date
    const fechaAperturaCompleta = new Date(`${this.fechaApertura}T${this.horaApertura}:00`);

    // Unir fecha de cierre y hora de cierre
    const fechaCierreCompleta = new Date(`${this.fechaCierre}T${this.horaCierre}:00`);

    const horarioNuevo= {
      nombre: this.nombreHorario,
      fechaInicio: fechaAperturaCompleta.getTime(),
      fechaFin: fechaCierreCompleta.getTime(),
    }
    console.log(horarioNuevo)

    this.horarioService.saveHorarios(horarioNuevo);

    this.horariosProm = this.horarioService.getHorarios();
    this.horariosProm.then(respuesta=>{
      this.horarios = respuesta
    })

    
  }

  guardarGeneral() {
    // Fecha base (puede ser cualquier fecha, por ejemplo, la fecha actual)
    const fechaBase = new Date();
  
    // Convertir las horas a timestamps
    const timestampIniciogl = this.crearTimestamp(fechaBase, this.horaIniciogl);
    const timestampFingl = this.crearTimestamp(fechaBase, this.horaFingl);
    const timestampIniciogs = this.crearTimestamp(fechaBase, this.horaIniciogs);
    const timestampFings = this.crearTimestamp(fechaBase, this.horaFings);
  
    // Asignar los timestamps al objeto publico
    this.publico.fechaInicio1 = timestampIniciogl;
    this.publico.fechaFin1 = timestampFingl;
    this.publico.fechaInicio2 = timestampIniciogs;
    this.publico.fechaFin2 = timestampFings;
  
    // Enviar los datos actualizados al backend
    this.publicService.ActualizarDatos(this.publico).then(response=>{
      this.publicoProm = this.publicService.obtenerDatos();
    this.publicoProm.then(respuesta=>{
      this.publico = respuesta
      console.log(this.publico)
      this.horarioGeneral.entrada1 = new Date(this.publico.fechaInicio1)
      this.horarioGeneral.entrada2 = new Date(this.publico.fechaInicio2)
      this.horarioGeneral.salida1 = new Date(this.publico.fechaFin1)
      this.horarioGeneral.salida2 = new Date(this.publico.fechaFin2)
    })
    })

    this.ocultarEditarGeneral();

    
  }
  
  // Método para crear un timestamp a partir de una fecha base y una hora en formato "HH:mm"
  crearTimestamp(fechaBase: Date, hora: string): number {
    const [horas, minutos] = hora.split(':').map(Number);
    const fecha = new Date(fechaBase); // Clonar la fecha base
    fecha.setHours(horas, minutos, 0, 0); // Asignar la hora y minutos
    return fecha.getTime(); // Devolver el timestamp
  }


  resetForm() {
    this.horarioe = null;
    this.nombreHorario = "";
    this.fechaApertura= new Date();;
    this.fechaCierre = new Date();;
  }

  // Método para formatear la hora como HH:MM
  formatearHora(fecha: Date): string {
    const horas = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
    return `${horas}:${minutos}`;
  }

  constructor(
    private horarioService: HorarioService,
    private router: Router,
    private userService: UserInfoService,
    private publicService: PublicoService
    
  ) {}

        
    
  async ngOnInit(): Promise<void> {
    this.validarUsuario();

    this.publicoProm = this.publicService.obtenerDatos();
    this.publicoProm.then(respuesta=>{
      this.publico = respuesta
      console.log(this.publico)
      this.horarioGeneral.entrada1 = new Date(this.publico.fechaInicio1)
      this.horarioGeneral.entrada2 = new Date(this.publico.fechaInicio2)
      this.horarioGeneral.salida1 = new Date(this.publico.fechaFin1)
      this.horarioGeneral.salida2 = new Date(this.publico.fechaFin2)
    })

    this.horariosProm = this.horarioService.getHorarios();
    this.horariosProm.then(respuesta=>{
      this.horarios = respuesta
    })

    

    //Actualizar manejo de fechas y horas dentro de java

     //manejo de fechas para lunes-viernes y sabado-domingo

     //eliminar valores predeterminados y cargar los horarios desde el backend.

     //creacion de horarios solicitud post

     //edicion de horarios solicitud put

      //eliminar horarios solicitud delete

    
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
