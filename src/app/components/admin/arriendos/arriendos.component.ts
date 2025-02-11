import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { ArriendosService } from '../../../services/arriendos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
@Component({
  selector: 'app-arriendos',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuComponent, ParqueaderoComponent],
  templateUrl: './arriendos.component.html',
  styleUrl: './arriendos.component.scss'
})
export class ArriendosComponent {
buscarUsuarioPorPlaca() {
throw new Error('Method not implemented.');
}
eliminarArriendo(arg0: string) {
throw new Error('Method not implemented.');
}

nuevo:{
  inicio:Date,
  fin:Date,
  usuario_id:string,
  lugar_id:number,
  placa:string
  nombreUsuario:string,
} = {
  inicio: new Date(),
  fin: new Date(),
  usuario_id: '',
  lugar_id: 2,
  placa: "  ",
  nombreUsuario: ''
} ;

nuevoArriendo:{
  fecha_inicio:Date,
  fecha_fin:Date,
  usuario_id:string,
  lugar_id:number,
  placa:string
}= {
  fecha_inicio : new Date(),
  fecha_fin : new Date(),
  usuario_id : '',
  lugar_id : 2,
  placa:"  "

};

crearArriendo() {
  const timestampIniciogl = this.crearTimestamp(this.nuevo.inicio);
    const timestampFingl = this.crearTimestamp(this.nuevo.fin);

    this.nuevoArriendo.fecha_inicio = new Date(timestampIniciogl)
    this.nuevoArriendo.fecha_fin = new Date(timestampFingl)

    ///aqui debes agregarle el uid del usuario para poder agregarle a la solicitud

    //el lugar ya se define con la funcion de seleccionar lugar.

    //y luego le envias a guardar

    //hay que cambiarle la logica a lo de arrendar, para que cambie el estado del lugar
    
}
  // Método para crear un timestamp a partir de una fecha base y una hora en formato "HH:mm"
  crearTimestamp(fechaBase: Date): number {
    const fecha = new Date(fechaBase); // Clonar la fecha base
    return fecha.getTime(); // Devolver el timestamp
  }

  @ViewChild('crear') crear!: ElementRef;

  arriendos: {
    usuario:{
      uid:string,
      nombre:string,
      telefono:string,
      direccion:string,
      cedula:string,
      placa:string,
    },id:number, fechaInicio:Date,fechaFin:Date, lugar:{
      id:number,
      posicion:string,
      estado:string,
    }
  }[] = [
    {
      usuario: {
        uid: "UID12345",
        nombre: "Juan Pérez",
        telefono: "0987654321",
        direccion: "Av. Siempre Viva 123",
        cedula: "1723456789",
        placa: "ABC-1234",
      },
      id: 1,
      fechaInicio: new Date("2025-02-07T08:00:00"),
      fechaFin: new Date("2025-02-07T10:00:00"),
      lugar: {
        id: 101,
        posicion: "A1",
        estado: "Ocupado",
      }
    },
    {
      usuario: {
        uid: "UID67890",
        nombre: "María González",
        telefono: "0998765432",
        direccion: "Calle Los Pinos 456",
        cedula: "1729876543",
        placa: "XYZ-5678",
      },
      id: 2,
      fechaInicio: new Date("2025-02-07T14:00:00"),
      fechaFin: new Date("2025-02-07T16:30:00"),
      lugar: {
        id: 102,
        posicion: "B3",
        estado: "Reservado",
      }
    }
  ];
  arriendosProm: Promise<any> | undefined;
; // Lista de arriendos
  
  user: any;
  tipo: Promise<string> | undefined;

  constructor(
    private arriendosService: ArriendosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private userService: UserInfoService
  ) {}


  @ViewChild('arrendar', { read: ElementRef }) arrendar!: ElementRef;
  @ViewChild('arrendar') arrendarComponent!: ParqueaderoComponent;


  seleccionarArrendar() {
    this.arrendar.nativeElement.classList.remove("parking-hidden");
    this.arrendarComponent.cambiarSeleccionArrendar(()=>{
      this.ocultarArrendar();
      this.nuevoArriendo.lugar_id = this.arrendarComponent.valorLugar;
    });
    this.arrendarComponent.cambiarMensaje("Seleccione un lugar para arrendar");
  }
  ocultarArrendar(){
    this.arrendar.nativeElement.classList.add("parking-hidden");
  }

  


  async ngOnInit(): Promise<void> {
    this.validarUsuario();
    

    this.arriendosProm = this.arriendosService.obtenerArriendos();
    this.arriendosProm.then(
      res=>{

        console.log(this.arriendos)
        this.arriendos= res;
        console.log(this.arriendos)
      }
    )
    //eliminar valores predeterminados de arriendos y cargar los arriendos desde el backend

    //agregar funcionalidad de CREAR arriendo

    //agregar funcionalidad de ELIMINAR arriendo    
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


  // Mostrar/Ocultar el formulario de creación
  desplegarCrear() {
    this.crear.nativeElement.classList.toggle('desplegarCrear');
  }


  // Buscar información del usuario asociada a una placa
  // buscarUsuarioPorPlaca() {
  //   if (!this.nuevoArriendo.placa) {
  //     alert('Por favor, ingresa una placa válida.');
  //     return;
  //   }

  //   this.arriendosService.obtenerUsuarioPorPlaca(this.nuevoArriendo.placa).then((snapshot) => {
  //     if (!snapshot.empty) {
  //       const userDoc = snapshot.docs[0].data();
  //       this.nuevoArriendo.nombreUsuario = userDoc['nombre'] || '';
  //       alert(`Usuario encontrado: ${this.nuevoArriendo.nombreUsuario}`);
  //     } else {
  //       alert('No se encontró un usuario asociado a esta placa.');
  //       this.nuevoArriendo.nombreUsuario = '';
  //     }
  //   });
  // }

  // Crear o actualizar un arriendo
  // async crearArriendo() {
  //   const { placa, inicio, fin, estado, nombreUsuario } = this.nuevoArriendo;

  //   if (!placa || !inicio || !fin || !estado || !nombreUsuario) {
  //     alert('Por favor, completa todos los campos antes de guardar.');
  //     return;
  //   }

  //   try {
  //     await this.arriendosService.crearArriendoPorPlaca(placa, {
  //       inicio,
  //       fin,
  //       estado,
  //       nombreUsuario,
        
  //     });
  //     this.obtenerArriendos();
  //     this.desplegarCrear();
  //     alert('Arriendo creado exitosamente.');
  //   } catch (error) {
  //     console.error('Error al crear arriendo:', error);
  //   }
  // }

  // Eliminar un arriendo por placa
  // eliminarArriendo(placa: string) {
  //   this.arriendosService.eliminarArriendoPorPlaca(placa).then(() => {
  //     this.obtenerArriendos();
  //     alert('Arriendo eliminado exitosamente.');
  //   }).catch((error) => console.error('Error al eliminar arriendo:', error));
  // }

  // Obtener todos los arriendos
  obtenerArriendos() {

  }
  
}
