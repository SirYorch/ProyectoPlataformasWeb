import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { UserInfoService } from '../../../services/user-info.service';
import { HorarioService } from '../../../services/horario.service'; // 📌 Nuevo servicio

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
    nombre: string,
    fechaInicio: Date,
    fechaFin: Date,
  }[] = [
    {
      nombre: "Horario Mañana",
      fechaInicio: new Date("2025-02-07T08:00:00"),
      fechaFin: new Date("2025-02-07T12:00:00"),
    },
    {
      nombre: "Horario Tarde",
      fechaInicio: new Date("2025-02-07T13:00:00"),
      fechaFin: new Date("2025-02-07T17:00:00"),
    }];
  general: any;
  user: any;
  horaIniciogl = "06:45";
  horaIniciogs = "08:00";
  horaFingl = "20:00";
  horaFings = "18:00";
  tipo: Promise<string> | undefined;
horaApertura: any;
horaCierre: any;

  constructor(
    private horarioService: HorarioService, // 📌 Usamos HorarioService
    private router: Router,
    private userService: UserInfoService
  ) {}
  async guardarGeneral() {
    const horarioData = {
      entrada1: this.horaIniciogl,
      entrada2: this.horaIniciogs,
      salida1: this.horaFingl,
      salida2: this.horaFings
    };

    try {
      await this.horarioService.saveGeneral(horarioData); //  Guardar en PostgreSQL
      console.log('Horario general guardado correctamente');
    } catch (error) {
      console.error(' Error al guardar el horario:', error);
    }
  }

  desplegarCrear() {
    this.crear.nativeElement.classList.toggle("desplegarCrear");
  }

  desplegarEditar(horario: any) {
    this.editar.nativeElement.classList.toggle("desplegarCrear");
    this.cambiarDatos(horario);
  }

  desplegarEditarGeneral() {
    this.editarGeneral.nativeElement.classList.toggle("desplegarCrear");
  }

  eliminar(horario: any) {
    this.horarios = this.horarios.filter((horarioE: any) => horarioE !== horario);
    console.log(this.horarios);
    this.horarioService.saveHorarios(this.horarios); // Guardar cambios en PostgreSQL
  }

  nombreHorario= "";
  fechaApertura: Date = new Date();
  fechaCierre:Date = new Date();;
  horarioe:any;

  cambiarDatos(horario: any) {
    if (horario) {
      this.horarioe = horario;
      console.log(horario);
      this.nombreHorario = horario.nombre;
      this.fechaApertura = horario.fechaInicio;
      this.fechaCierre = horario.fechaFin;
    }
  }

  guardarEditar() {
    this.horarioe.nombre = this.nombreHorario;
    this.horarioe.fechaInicio = this.fechaApertura;
    this.horarioe.fechaFin = this.fechaCierre;
    
    this.horarioService.saveHorarios(this.horarios);
    this.desplegarEditar(null);
    this.resetForm();
  }

  crearHorario() {
    const horario = {
      fechaFin: this.fechaCierre,
      fechaInicio: this.fechaApertura,
      nombre: this.nombreHorario,
    };
    this.horarios.push(horario);
    this.horarioService.saveHorarios(this.horarios);
  }

  resetForm() {
    this.horarioe = null;
    this.nombreHorario = "";
    this.fechaApertura= new Date();;
    this.fechaCierre = new Date();;
  }


    async ngOnInit(): Promise<void> {
      this.validarUsuario();
      
      // actualizacion de objeto public para lectura de datos motd y fechas lunes-viernes y sabado-domingo
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
