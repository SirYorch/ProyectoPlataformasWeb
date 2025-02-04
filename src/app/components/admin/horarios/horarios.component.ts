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

  horarios: any[] = [];
  general: any;
  user: any;
  horaIniciogl = "06:45";
  horaIniciogs = "08:00";
  horaFingl = "20:00";
  horaFings = "18:00";

  constructor(
    private horarioService: HorarioService, // 📌 Usamos HorarioService
    private router: Router,
    private userService: UserInfoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['login']);
      return;
    }

    try {
      this.horarios = await this.horarioService.getHorarios(); // ✅ Obtener horarios de PostgreSQL
      this.general = await this.horarioService.getGeneral();   // ✅ Obtener configuración general
      
      console.log("📌 Horarios obtenidos:", this.horarios);
      console.log("📌 Configuración general obtenida:", this.general);

      this.horaIniciogl = this.general.entrada1;
      this.horaIniciogs = this.general.entrada2;
      this.horaFingl = this.general.salida1;
      this.horaFings = this.general.salida2;

    } catch (error) {
      console.error('❌ Error al obtener horarios:', error);
    }
  }

  async guardarGeneral() {
    const horarioData = {
      entrada1: this.horaIniciogl,
      entrada2: this.horaIniciogs,
      salida1: this.horaFingl,
      salida2: this.horaFings
    };

    try {
      await this.horarioService.saveGeneral(horarioData); // ✅ Guardar en PostgreSQL
      console.log('✅ Horario general guardado correctamente');
    } catch (error) {
      console.error('❌ Error al guardar el horario:', error);
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
    this.horarioService.saveHorarios(this.horarios); // ✅ Guardar cambios en PostgreSQL
  }

  nombreHorario= "";
  fechaApertura= "";
  fechaCierre= "";
  horaApertura= "";
  horaCierre= "";
  horarioe:any;

  cambiarDatos(horario: any) {
    if (horario) {
      this.horarioe = horario;
      console.log(horario);
      this.nombreHorario = horario.nombre;
      this.fechaApertura = horario.fechaInicio;
      this.fechaCierre = horario.fechaFin;
      this.horaApertura = horario.inicio;
      this.horaCierre = horario.fin;
    }
  }

  guardarEditar() {
    this.horarioe.nombre = this.nombreHorario;
    this.horarioe.fechaInicio = this.fechaApertura;
    this.horarioe.fechaFin = this.fechaCierre;
    this.horarioe.inicio = this.horaApertura;
    this.horarioe.fin = this.horaCierre;
    
    this.horarioService.saveHorarios(this.horarios);
    this.desplegarEditar(null);
    this.resetForm();
  }

  crearHorario() {
    const horario = {
      fechaFin: this.fechaCierre,
      fechaInicio: this.fechaApertura,
      fin: this.horaCierre,
      inicio: this.horaApertura,
      nombre: this.nombreHorario,
    };
    this.horarios.push(horario);
    this.horarioService.saveHorarios(this.horarios);
  }

  resetForm() {
    this.horarioe = null;
    this.nombreHorario = "";
    this.fechaApertura = "";
    this.fechaCierre = "";
    this.horaApertura = "";
    this.horaCierre = "";
  }
}
