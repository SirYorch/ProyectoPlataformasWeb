import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { Timestamp } from 'firebase/firestore'; // Importar Timestamp
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss'
})
export class HorariosComponent {

  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('crear') crear!: ElementRef;
  @ViewChild('editar') editar!: ElementRef;
  @ViewChild('editarGeneral') editarGeneral!: ElementRef;

  horarios: any;
  general: any;
  user: any;
  horaIniciogl = "6:45 AM";
  horaIniciogs = "8:00AM";
  horaFingl = "8:00PM";
  horaFings = "6:00PM";

  constructor(
    private googleuser: GoogleAuthService,
    private read: ReadService,
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
      const userExists = await this.googleuser.checkUserExists(this.user.uid);
      this.horarios = await this.googleuser.getHorarios();
      this.general = await this.googleuser.getGeneral();

      console.log(this.horarios);
      console.log(this.general);
      // Convertir las horas al formato de 24 horas
      this.horaIniciogl = this.convertTo24HourFormat(
        `${this.general.entrada1.hora}:${this.general.entrada1.minutos} ${this.general.entrada1.ampm}`
      );
      this.horaIniciogs = this.convertTo24HourFormat(
        `${this.general.entrada2.hora}:${this.general.entrada2.minutos} ${this.general.entrada2.ampm}`
      );
      this.horaFingl = this.convertTo24HourFormat(
        `${this.general.salida1.hora}:${this.general.salida1.minutos} ${this.general.salida1.ampm}`
      );
      this.horaFings = this.convertTo24HourFormat(
        `${this.general.salida2.hora}:${this.general.salida2.minutos} ${this.general.salida2.ampm}`
      );

      if (!userExists) {
        this.router.navigate(['login']);
        return;
      }

      const usuario = await this.googleuser.getUserInfo(this.user.uid);
      if (!usuario || usuario.stat !== 'Admin') {
        this.router.navigate(['']);
      }
    } catch (error) {
      console.error('Error durante la validación del usuario:', error);
    }
  }

  guardarGeneral() {
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Crear los timestamps usando Firebase.firestore.Timestamp
    const aperturaLunesViernes = this.createFirestoreTimestamp(today, this.horaIniciogl);
    const cierreLunesViernes = this.createFirestoreTimestamp(today, this.horaFingl);
    const aperturaSabadoDomingo = this.createFirestoreTimestamp(today, this.horaIniciogs);
    const cierreSabadoDomingo = this.createFirestoreTimestamp(today, this.horaFings);

    // Preparar los datos para guardarlos
    const horarioData = {
      entrada1: aperturaLunesViernes,
      entrada2: aperturaSabadoDomingo,
      salida1: cierreLunesViernes,
      salida2: cierreSabadoDomingo,
    };

    // Guardar los datos en Firestore
    this.googleuser.saveGeneral(horarioData)
      .then(() => console.log('Horario guardado correctamente'))
      .catch((error) => console.error('Error al guardar el horario:', error));
  }

  // Función para crear un timestamp de Firestore a partir de fecha y hora
  createFirestoreTimestamp(date: string, time: string): Timestamp {
    const [hours, minutes] = time.split(':').map(Number); // Divide horas y minutos
    const fullDate = new Date(date); // Crea un objeto Date con la fecha
    fullDate.setHours(hours, minutes, 0, 0); // Establece hora, minutos, segundos, milisegundos
    return Timestamp.fromDate(fullDate); // Retorna el timestamp de Firestore
  }

  convertTo24HourFormat(time: string): string {
    const [hours, minutes] = time.split(/[: ]/); // Divide horas y minutos
    const period = time.slice(-2).toUpperCase(); // Obtiene AM o PM
    let hour = parseInt(hours, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }


  // Métodos existentes que se mantienen
  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }

  logout() {
    this.googleuser.logout();
    this.userService.clearUser();
    this.router.navigate(['']);
  }

  desplegarCrear() {
    this.crear.nativeElement.classList.toggle("desplegarCrear");
  }

  desplegarEditar(horario:any) {
    this.editar.nativeElement.classList.toggle("desplegarCrear");
    this.cambiarDatos(horario);
  }

  desplegarEditarGeneral() {
    this.editarGeneral.nativeElement.classList.toggle("desplegarCrear");
  }

  eliminar(horario:any) {
    console.log(this.horarios);
    this.horarios = this.horarios.filter((horarioE:any)=> horarioE !== horario);
    console.log(this.horarios);
    this.googleuser.saveHorarios(this.horarios);
  }

  nombreHorario= "";
  fechaApertura= "";
  fechaCierre="";
  horaApertura:any="";
  horaCierre:any="";
  cambiarDatos(horario: any) {
    if(horario != null){
      this.horarioe =horario;
      console.log(horario);
      this.nombreHorario = horario.nombre;
      this.fechaApertura = horario.fechaInicio;
      this.fechaCierre = horario.fechaFin;
      this.horaApertura = this.convertirHora(horario.inicio);
      this.horaCierre = this.convertirHora(horario.fin);
    }
}

convertirHora(horaString: string): string {
  const [tiempo, periodo] = horaString.split(' ');
  const [horas, minutos] = tiempo.split(':');
  let horasNum = parseInt(horas);
  
  // Ajustar para PM
  if (periodo === 'PM' && horasNum !== 12) {
      horasNum += 12;
  }
  // Ajustar para AM
  if (periodo === 'AM' && horasNum === 12) {
      horasNum = 0;
  }
  
  // Retornar en formato HH:mm para input type="time"
  return `${horasNum.toString().padStart(2, '0')}:${minutos}`;
}
horarioe:any ;

guardarEditar(){
  this.horarioe.nombre = this.nombreHorario
  this.horarioe.fechaInicio = this.fechaApertura
  this.horarioe.fechaFin = this.fechaCierre
  this.horarioe.inicio = this.horaApertura
  this.horarioe.fin = this.horaCierre;
  this.googleuser.saveHorarios(this.horarios);
  this.desplegarEditar(null);
  this.horarioe = null;
  this.nombreHorario= "";
  this.fechaApertura= "";
  this.fechaCierre= "";
  this.horaApertura= "";
  this.horaCierre = "";
}

crearHorario(){
  const horario  = {
    fechaFin: this.fechaCierre,
    fechaInicio: this.fechaApertura,
    fin: this.horaCierre,
    inicio: this.horaApertura,
    nombre: this.nombreHorario,
  }
  this.horarios.push(horario)
  this.googleuser.saveHorarios(this.horarios);
}

}
